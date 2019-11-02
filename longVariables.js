const steps = [
    {
        title: 'Por favor, digite:',
        definedInputs: [
            {
                name: 'teamNumber',
                placeholder: 'O número de times',
            },
            {
                name: 'memberNumber',
                placeholder: 'O número de membros por time',
            },
        ],
        button: {
            class: 'insert-team-number',
            value: 'Inserir Quantidades',
        },
    },
    {
        title: 'Digite o MBTI das Ondas',
        inputModel: [
            {
                name: 'name',
                placeholder: 'Nome',
            },
            {
                name: 'mbti',
                placeholder: 'MBTI',
            },
        ],
        button: {
            class: 'insert-mbti-wave',
            value: 'Inserir MBTI das Ondas',
        },
    },
    {
        title: 'Digite o MBTI dos Membros',
        inputModel: [
            {
                name: 'name',
                placeholder: 'Nome',
            },
            {
                name: 'mbti',
                placeholder: 'MBTI',
            },
        ],
        button: {
            class: 'insert-mbti-member',
            value: 'Inserir MBTI dos Membros',
        },
    },
];

const colors = [
    '#000000',
    '#B62E16',
    '#FEF64C',
    '#9EC75D',
    '#47A559',
    '#35B0E9',
];

const texts = [
    'ERRO',
    'Melhor não',
    'Chance pequena',
    'Talvez',
    'Uma boa chance',
    'Ideal!',
];

const mbtiValues = [
    'INFP',
    'ENFP',
    'INFJ',
    'ENFJ',
    'INTJ',
    'ENTJ',
    'INTP',
    'ENTP',
    'ISFP',
    'ESFP',
    'ISTP',
    'ESTP',
    'ISFJ',
    'ESFJ',
    'ISTJ',
    'ESTJ',
];

// 1 2 3 4 5
// 5 is best and 1 is worst
const mbtiMatrix = [
    [4, 4, 4, 5, 4, 5, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, ],
    [4, 4, 5, 4, 5, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, ],
    [4, 5, 4, 4, 4, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, ],
    [5, 4, 4, 4, 4, 4, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1, ],
    [4, 5, 4, 4, 4, 4, 4, 5, 3, 3, 3, 3, 2, 2, 2, 2, ],
    [5, 4, 4, 4, 4, 4, 5, 4, 3, 3, 3, 3, 3, 3, 3, 3, ],
    [4, 4, 4, 4, 4, 5, 4, 4, 3, 3, 3, 3, 2, 2, 2, 5, ],
    [4, 4, 5, 4, 5, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, ],
    [1, 1, 1, 5, 3, 3, 3, 3, 2, 2, 2, 2, 3, 5, 3, 5, ],
    [1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 5, 3, 5, 3, ],
    [1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 3, 5, 3, 5, ],
    [1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 5, 3, 5, 3, ],
    [1, 1, 1, 1, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4, ],
    [1, 1, 1, 1, 2, 3, 2, 2, 5, 3, 5, 3, 4, 4, 4, 4, ],
    [1, 1, 1, 1, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4, ],
    [1, 1, 1, 1, 2, 3, 5, 2, 5, 3, 5, 3, 4, 4, 4, 4, ],
];
