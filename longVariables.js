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
                name: 'wave-name',
                placeholder: 'Nome',
            },
            {
                name: 'wave-mbti',
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
                name: 'member-name',
                placeholder: 'Nome',
            },
            {
                name: 'member-mbti',
                placeholder: 'MBTI',
            },
        ],
        button: {
            class: 'insert-mbti-member',
            value: 'Inserir MBTI dos Membros',
        },
    },
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
