// Import renderer for communication
const { ipcRenderer } = require('electron');

// Get element function
const gel = el => document.querySelector(el);

// This function adds an input to inputContainer
const populateInput = (inputContainer, { name, placeholder }) => {
	const inputValue = `<input type="text" class="text" name="${name}" id="${name}" placeholder="${placeholder}" required >`;
	inputContainer.innerHTML += inputValue;
};

const getTeamSum = (team) => {
	let sum = 0;
	let count = 0;
	combinatorialAlgorithm(team, 2).forEach((fraction) => {
		sum += mbtiMatrix[fraction[0].mbtiNumber][fraction[1].mbtiNumber];
		count++;
	});
	return {
		sum,
		count,
	};
};

const calculate = (info) => {
	// First lets translate the strings to numbers
	info.members.map((member, i) => {
		info.members[i].mbtiNumber = mbtiValues.indexOf(member.mbti.split('-')[0].toUpperCase());
	});
	
	info.waves.map((wave, i) => {
		info.waves[i].mbtiNumber = mbtiValues.indexOf(wave.mbti.split('-')[0].toUpperCase());
	});

	let allConceivableCombinations = [];

	info.waves.forEach((wave) => {
		// This algorithm is going to generate every combination of members
		const teamCombinations = combinatorialAlgorithm(info.members, info.memberPerTeam);
		// We are going to sort this array by sum, which means the best combinations come first
		const waveCombinations = teamCombinations.map((team) => {
			const completeTeam = [wave, ...team];
			const { sum, count } = getTeamSum(completeTeam);
			return {
				average: sum / count,
				sum,
				team: completeTeam,
			}
		});

		waveCombinations.sort((a, b) => b.sum - a.sum);

		// Sorting the array
		allConceivableCombinations.push(waveCombinations);
	});

	return allConceivableCombinations;
}

// Every time this function is called with and different status, it changes the title and the inputs
const changeStatus = (status, memberNumber) => {
	const title = gel('.title');
	const inputContainer = gel('.input-wrapper');
	const button = gel('.continue');
	const output = [];

	let subOutput = {};
	// We are getting the values of the input field in an object array
	[...gel('.input-wrapper').children].forEach((input, i) => {
		const { name, value } = input;
		// We get info two by two
		if (i !== 0 && i % 2 === 0) {
			output.push(subOutput);
			subOutput = {};
		}
		subOutput[name] = value;
	});

	output.push(subOutput);

	// This is the final status
	if (status === 3) return output;

	const currentStatus = steps[status];

	title.innerText = currentStatus.title;

	inputContainer.innerHTML = '';
	if (currentStatus.definedInputs) {
		currentStatus.definedInputs.forEach((input) => {
			populateInput(inputContainer, input);
		});
	} else {
		if (status === 1) {
			// The waves status
			for (let i = 0; i < +output[0].teamNumber; i++) {
				currentStatus.inputModel.forEach((inputModel) => {
					populateInput(inputContainer, inputModel);
				});
			}
		} else if (status === 2) {
			// The members status
			for (let i = 0; i < memberNumber; i++) {
				currentStatus.inputModel.forEach((inputModel) => {
					populateInput(inputContainer, inputModel);
				});
			}
		}
	}

	// Changing the button value
	button.classList.add(currentStatus.button.class);
	button.value = currentStatus.button.value;

	return output;
}

const renderCombinations = (allCombinations) => {
	if (gel('.input-container')) gel('.input-container').outerHTML = '';
	gel('.all-combinations-container').innerHTML = '';
	allCombinations.forEach((combinations, i) => {
		gel('.all-combinations-container').innerHTML += `
			<div class="combination-container" id="${combinations[i].team[0].name.toLowerCase()}"></div>
		`;
		combinations.forEach(({ average, team }) => {
			const color = colors[Math.round(average)];
			gel(`#${team[0].name.toLowerCase()}`).innerHTML += `
				<div class="combination-container" style="border: 5px solid ${color}" >
					<div class="title-container" style="border-bottom: 5px solid ${color}">
						<h1>${team[0].name} (${team[0].mbti})</h1>
						<p>Nota: <span style="color: ${color}" >${average.toFixed(2)}</span></p>
					</div>	
					${(team.map((member, i) => {
						if (i !== 0) {
							return `<h2>${member.name} (${member.mbti})</h2>`;
						}
					})).join(' ')}
				</div>
			`;
		});
	});
};

let memberNumber;
let globalOutput;

gel('.continue').addEventListener('click', (e) => {
	const classList = e.target.classList;

	if (classList.contains('insert-team-number')) {
		const output = changeStatus(1);
		// The initial status, we are receiving the main info
		memberNumber = output[0].memberNumber * output[0].teamNumber;
		globalOutput = {
			memberPerTeam: +output[0].memberNumber,
			teamNumber: +output[0].teamNumber,
			memberNumber,
		};
		classList.remove('insert-team-number');
	} else if (classList.contains('insert-mbti-wave')) {
		// In here we get the waves names an MBTI's
		const output = changeStatus(2, memberNumber);
		globalOutput.waves = output;
		classList.remove('insert-mbti-wave');
	} else if (classList.contains('insert-mbti-member')) {
		// Then the members's names and MBTI's
		const output = changeStatus(3);
		globalOutput.members = output;
		// Now we have everything we need in globalOutput, let's start processing
		const combinations = calculate(globalOutput);
		ipcRenderer.on('send-response', (event, arg) => {
			console.log(arg);
		})
		ipcRenderer.send('send-output', JSON.stringify(globalOutput))
		renderCombinations(combinations);
	}
});

gel('.quick-calc').addEventListener('click', () => {
	const first = mbtiValues.indexOf(gel('#quick-mbti1').value);
	const second = mbtiValues.indexOf(gel('#quick-mbti2').value);
	const number = mbtiMatrix[first][second];

	gel('.quick-result-container').innerHTML = `
		<p>Nota: <span style="color: ${colors[number]}">${number}</span></p>
		<p style="border-bottom: 2px solid ${colors[number]}" >${texts[number]}</p>
	`;
});

gel('#log-file').addEventListener('change', () => {
	const file = gel('#log-file').files[0];

	const reader = new FileReader();

	reader.readAsText(file, 'UTF-8');
	reader.onload = (e) => {
		const combinations = calculate(JSON.parse(e.target.result));
		renderCombinations(combinations);
	};
});
