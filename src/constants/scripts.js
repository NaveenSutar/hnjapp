const NEW_SCRIPT = [
  {
    secId: 1,
    secLabel: 'Ayurveda (Science of Life)',
    secBody:
      'Is the science of understanding your own unique self and being who you are meant to be.\nThe first sign your body sends you is through the dhatus (elements that form the body structure).',
    secFootNote:
      'The First set of questions is formed to understand the seven dhatus that forms the physical structure of your body',
    secImageBackground:
      'https://healthandjiva.s3.ap-south-1.amazonaws.com/assets/form_screen2.png',
    saveButton: false,
    secQuestions: [
      {
        qId: 1,
        qLabel: 'My Body frame is',
        qOptions: [
          { id: 1, value: 'Thin and lean built' },
          { id: 2, value: 'Medium built' },
          { id: 3, value: 'Well built' },
        ],
        qInfo:
          'Human body is made up of 5 elements. Air, water, earth, fire and space. Individual with lighter constitiution have a slighter build and a leaner physique overall',
        qTag: 'bodyFrame',
        qAnswers: [false, false, false],
      },
      {
        qId: 2,
        qLabel: 'My tendency to lose weight is',
        qOptions: [
          { id: 1, value: 'Fast' },
          { id: 2, value: 'Slow' },
          { id: 3, value: 'Manageable' },
        ],
        qInfo:
          'The disbalance of functional energies of body along with metabolism results in regular or irregular weight loss or gain',
        qTag: 'bodyWeight',
        qAnswers: [false, false, false],
      },
      {
        qId: 3,
        qLabel: 'The texture of my skin is',
        qOptions: [
          { id: 1, value: 'Dry, Rough, Cold (tends towards wrinkles)' },
          { id: 2, value: 'Reddish, Warm, Moist' },
          { id: 3, value: 'Cold, Moist, Thick, Slightly Oily (few wrinkles)' },
        ],
        qInfo:
          'The health of skin depends upon the equilibrium of the vital forces in body. If there is an aggrevation, it is manifested in the form of uneven skin texture',
        qTag: 'skin',
        qAnswers: [false, false, false],
      },
      {
        qId: 4,
        qLabel: 'The texture of my nail is',
        qOptions: [
          { id: 1, value: 'Blackish, Small, Brittle' },
          { id: 2, value: 'Reddish, Small' },
          { id: 3, value: 'Pinkish, Big, Smooth' },
        ],
        qInfo:
          'The nails are by-products of the bones and therefore the health of the bones can be reflected in the health of nails i.e. thin, brittle nails may corelate to weak bones',
        qTag: 'nails',
        qAnswers: [false, false, false],
      },
    ],
  },
  {
    secId: 2,
    secLabel:
      'Your body communicates to you clearly, especially, if you are ready to listen.',
    secBody:
      'Darshan is an Ayurvedic diagnosis process of observing the physical appearance to comprehend the body’s physical signs.',
    secFootNote: 'Ready to learn your body’s language ? Lets go.',
    secImageBackground:
      'https://healthandjiva.s3.ap-south-1.amazonaws.com/assets/appearance.png',
    saveButton: false,
    secQuestions: [
      {
        qId: 5,
        qLabel: 'The texture of my hair is',
        qOptions: [
          { id: 1, value: 'Pale, Brown, Frizzy' },
          { id: 2, value: 'Red, Thin, turns gray easily' },
          { id: 3, value: 'Black, Thick, Lustrous' },
        ],
        qInfo:
          'Every individual has a unique body constitution (Prakriti) which regulates the type and texture of hair, The imbalance in functional energy affets the heatlh of hair',
        qTag: 'hairTexture',
        qAnswers: [false, false, false],
      },
      {
        qId: 6,
        qLabel: 'Strength in my joints',
        qOptions: [
          { id: 1, value: 'Dry, Less Flexible, tend to crack' },
          { id: 2, value: 'Warm, Loose Joints and Flexible' },
          { id: 3, value: 'Well lubricated, thickly padded' },
        ],
        qInfo:
          'The strength in joints is a result of metabolism disturbance which can lead to inflammation causing painful, swollen jonints which indicates the health of entire body',
        qTag: 'joints',
        qAnswers: [false, false, false],
      },
    ],
  },
  {
    secId: 3,
    secLabel: 'Mana (The mind)',
    secBody:
      'Is as important as the physical characteristics in Ayurveda. Your Mind (Mana) is undoubtedly a powerful instrument. Your body’s chemistry changes with every thought (dhyeya) and every emotion you create.',
    secFootNote:
      "Let's answer few questions to understand the melody of your mind",
    secImageBackground:
      'https://healthandjiva.s3.ap-south-1.amazonaws.com/assets/mind.jpeg',
    saveButton: false,
    secQuestions: [
      {
        qId: 7,
        qLabel: 'My memory is',
        qOptions: [
          { id: 1, value: 'Long term' },
          { id: 2, value: 'Short term' },
          { id: 3, value: 'Average' },
        ],
        qInfo:
          "Memory is the ability to recall the information stored by brain when needed. It can help us analyze the functioning of brain and any imbalance in body's primary functional energies(dosha) which directly impacts memory",
        qTag: 'memory',
        qAnswers: [false, false, false],
      },
      {
        qId: 8,
        qLabel: 'My sleep pattern is',
        qOptions: [
          { id: 1, value: 'Light Interrupted Sleep' },
          { id: 2, value: 'Moderate (6-8 hrs)' },
          { id: 3, value: 'Feels sleepy and lazy after waking up' },
        ],
        qInfo:
          'Sleep is an important factor for normal biological function. It is considered the quality and quantity of sleep is essential to our own health and well being as our dietary habits. Any changes in inner-self starts affecting the sleep pattern',
        qTag: 'sleepPattern',
        qAnswers: [false, false, false],
      },
      {
        qId: 9,
        qLabel: 'With regards to mental ability, I categorize myself in',
        qOptions: [
          { id: 1, value: 'Quick, gets distracted easily' },
          { id: 2, value: 'Smart Intense' },
          { id: 3, value: 'Calm, Steady' },
        ],
        qInfo: null,
        qTag: 'mentalActivity',
        qAnswers: [false, false, false],
      },
      {
        qId: 10,
        qLabel: 'Under stress conditions, I tend to get',
        qOptions: [
          { id: 1, value: 'Anxious, Worried' },
          { id: 2, value: 'Angry, Irritated Quickly' },
          { id: 3, value: 'Steady, Calm' },
        ],
        qInfo: null,
        qTag: 'stress',
        qAnswers: [false, false, false],
      },
    ],
  },
  {
    secId: 4,
    secLabel: 'You are almost there.',
    secBody:
      'Looking into yourself and observing is the first step in conquering the chemistry of your body.\nYou are doing so well. Your answers are helping us see your body’s needs.',
    secFootNote:
      'Keep going, only a few more questions to bring your sarira (body), mana (mind) and Atma (soul) in harmony.',
    secImageBackground: null,
    saveButton: false,
    secQuestions: [
      {
        qId: 11,
        qLabel: 'My mind is ',
        qOptions: [
          { id: 1, value: 'Quick, Creative, Imaginative' },
          { id: 2, value: 'Calculated, Intellectual, Perfectionist' },
          { id: 3, value: 'Trusting, Supportive and Selfless' },
        ],
        qInfo: null,
        qTag: 'mind',
        qAnswers: [false, false, false],
      },
      {
        qId: 12,
        qLabel: 'I describe my decision making skills as',
        qOptions: [
          { id: 1, value: 'Confused' },
          { id: 2, value: 'Fast and Sound' },
          { id: 3, value: 'Slow' },
        ],
        qInfo:
          'Decision making skills helps us analyze the clarity of thoughts in mind and awareness',
        qTag: 'decision',
        qAnswers: [false, false, false],
      },
      {
        qId: 13,
        qLabel: 'While spending money, I',
        qOptions: [
          { id: 1, value: 'Spend without thinking much' },
          { id: 2, value: 'Save but spend on valuable item' },
          { id: 3, value: 'Prefer Saving' },
        ],
        qInfo:
          'The money spending habits is directly dependent on mind, while spending too much can generate stress, saving can keep you calm',
        qTag: 'money',
        qAnswers: [false, false, false],
      },
      {
        qId: 14,
        qLabel: 'Whenever I take alcohol I am',
        qOptions: [
          { id: 1, value: 'Hyperactive, chatty' },
          { id: 2, value: 'Have high tolerance' },
          { id: 3, value: 'Have Low tolerance / No Alcohol Intake' },
        ],
        qInfo:
          'While understanding the behavior after alcohol consumption it can be verified that how alcohol is affecting inner self/mind and can help to counter the imbalance created by alcohol on each specific individual',
        qTag: 'alcohol',
        qAnswers: [false, false, false],
      },
    ],
  },
  {
    secId: 5,
    secLabel:
      'Life (ayu) is the combination (samyoga) of body, senses mind and soul',
    secBody:
      'Let us understand the basics of our mind and soul to heal from within',
    secFootNote: "Let's Progress",
    imageBackground:
      'https://healthandjiva.s3.ap-south-1.amazonaws.com/assets/healing.jpeg',
    saveButton: false,
    secQuestions: [
      {
        qId: 15,
        qLabel: 'My pace of performing any task is',
        qOptions: [
          { id: 1, value: 'Fast, always in hurry' },
          { id: 2, value: 'Medium Pace and energetic' },
          { id: 3, value: 'Slow and Steady' },
        ],
        qInfo: null,
        qTag: 'workPace',
        qAnswers: [false, false, false],
      },
      {
        qId: 16,
        qLabel: 'My pulse rate is',
        qOptions: [
          { id: 1, value: 'Fast' },
          { id: 2, value: 'Average' },
          { id: 3, value: 'Slow' },
        ],
        qInfo:
          'The pulse rate is used to get a glimpse of overall wellness and specific health concerns via the vibrations and frequency of pulse at different levels on the radial energy of the wrist',
        qTag: 'pulseRate',
        qAnswers: [false, false, false],
      },
      {
        qId: 17,
        qLabel: 'Weather I dislike is',
        qOptions: [
          { id: 1, value: 'Hot Weather' },
          { id: 2, value: 'Cold Weather' },
          { id: 3, value: 'Humid, Moist and Rainy' },
        ],
        qInfo:
          'The weather outside deppends on the season according to which food is consumed which in-turn decides if the body temoperature is cold or hot. If body temperature is cold, preference is warmer climate and if warm, preference is cool climate',
        qTag: 'weather',
        qAnswers: [false, false, false],
      },
      {
        qId: 18,
        qLabel: 'My tolerance for exercise is',
        qOptions: [
          { id: 1, value: 'Poor' },
          { id: 2, value: 'Good' },
          { id: 3, value: 'Excellent' },
        ],
        qInfo:
          "The exercise tolerance depends on one's constitution and it's balance, age, surrounding climate and the season",
        qTag: 'tolerance',
        qAnswers: [false, false, false],
      },
      {
        qId: 19,
        qLabel: 'My Communication skills are',
        qOptions: [
          { id: 1, value: 'Good Speaker' },
          { id: 2, value: 'Firm and Little speech' },
          { id: 3, value: 'Speak fast, speech is not clear' },
        ],
        qInfo:
          'There is a strong connection between your unique constitutional energy (dosha) and your style of communication. It is the pre-dominant energy in your being which has implications on both mind and body',
        qTag: 'communicationSkills',
        qAnswers: [false, false, false],
      },
      {
        qId: 20,
        qLabel: 'My sweating pattern is',
        qOptions: [
          { id: 1, value: 'Hardly Sweat' },
          { id: 2, value: 'Sweat easily and profusely' },
          { id: 3, value: 'Average Sweat' },
        ],
        qInfo:
          'Sweat is formed during digestion and metabolism while controlling body temperature, cools the body and purifies the blood. The quantity of sweat depends upon the hydration level of the body as it is fraction of water in body and help us understand the temperature regulation',
        qTag: 'sweating',
        qAnswers: [false, false, false],
      },
    ],
  },
  {
    secId: 6,
    secLabel:
      'I am convinced that digestion is the great escape of life - Sydney Smith',
    secBody:
      'You are what you eat. Your eating habits constitute so much in understanding your body.\nMala (excreta) is considered as one of the roots of sarira (human body). The Trimala (stool, urine and sweat) is consistently expelled by the body and any irregularity can symbolise imbalance in doshas.',
    secFootNote: "A set of questions to know your gut health. Let's proceed.",
    secImageBackground:
      'https://healthandjiva.s3.ap-south-1.amazonaws.com/assets/metabolism.png',
    saveButton: false,
    secQuestions: [
      {
        qId: 21,
        qLabel: 'My eating tendency is',
        qOptions: [
          { id: 1, value: 'Slow Pace' },
          { id: 2, value: 'Fast Pace' },
          { id: 3, value: 'Average Pace' },
        ],
        qInfo:
          'The pace of eating meal deternmines how well the food is being chewed, Chewing processes the food and makes it ready for digestion',
        qTag: 'eatingTendency',
        qAnswers: [false, false, false],
      },
      {
        qId: 22,
        qLabel: 'My bowel tendency is',
        qOptions: [
          { id: 1, value: 'Less than once a day' },
          { id: 2, value: 'Several times a day' },
          { id: 3, value: 'Once or twice a day' },
        ],
        qInfo:
          'Elimination is an important indicator of overall health and it points to strong digestive fire(agni), and the frequency of bowel determines healthy elimination',
        qTag: 'bowelTendency',
        qAnswers: [false, false, false],
      },
      {
        qId: 23,
        qLabel: 'My bowel texture is',
        qOptions: [
          { id: 1, value: 'Dry, blackish and scanty' },
          { id: 2, value: 'Soft, Yellowish and Loose' },
          { id: 3, value: 'Heavy, thick and sticky' },
        ],
        qInfo:
          'Healthy elimination carries out the critial functions of absorbing water and glucose forming stools, eliminating solid waste and cleaning heavy metals and toxins from the body',
        qTag: 'bowelTexture',
        qAnswers: [false, false, false],
      },
      {
        qId: 24,
        qLabel: 'My hunger pattern is ',
        qOptions: [
          { id: 1, value: 'Changeable, small amount of  food is enough' },
          { id: 2, value: 'Sharp hunger, can eat in large proportions' },
          { id: 3, value: 'Can skip meals easily' },
        ],
        qInfo:
          "The hunger pattern indicates the metabolism of body. If one keep having sharp hunger means the digestive fire is strong. If hunger frequecy is very less it indicates that the previous meal is not digested. Hunger is the body's need for food and appetitie triggered in mind",
        qTag: 'hungerPattern',
        qAnswers: [false, false, false],
      },
    ],
  },
];

const PRAKRITI_ASSESSMENT_SCRIPT = {
  secLabel: 'Lorem ipsum is simply a dummy text of.',
  secBody: 'Lorem ipsum is simply a dummy text of.',
  questions: [
    {
      qId: 1,
      qLabel: 'The texture of my skin is',
      qOptions: [
        { id: 1, value: 'Dry/Rough' },
        { id: 2, value: 'Sweating' },
        { id: 3, value: 'Oily' },
      ],
      qInfo:
        'The health of skin depends upon the equilibrium of the vital forces in body. If there is an aggrevation, it is manifested in the form of uneven skin texture',
      qTag: 'skin',
      qAnswers: [false, false, false],
    },
    {
      qId: 2,
      qLabel: 'The taste in my mounth',
      qOptions: [
        { id: 1, value: 'Astringent' },
        { id: 2, value: 'Sour' },
        { id: 3, value: 'Sweet' },
      ],
      qInfo: 'Lorem ipsum is simply a dummy text of.',
      qTag: 'taste',
      qAnswers: [false, false, false],
    },
    {
      qId: 3,
      qLabel: 'Digestion',
      qOptions: [
        { id: 1, value: 'Bloated/Constipated' },
        { id: 2, value: 'Loose Stools' },
        { id: 3, value: 'Indigestion' },
      ],
      qInfo: 'Lorem ipsum is simply a dummy text of.',
      qTag: 'digestion',
      qAnswers: [false, false, false],
    },
    {
      qId: 4,
      qLabel: 'Body Parts',
      qOptions: [
        { id: 1, value: 'Light' },
        { id: 2, value: 'Hot' },
        { id: 3, value: 'Heavy' },
      ],
      qInfo: 'Lorem ipsum is simply a dummy text of.',
      qTag: 'bodyParts',
      qAnswers: [false, false, false],
    },
    {
      qId: 5,
      qLabel: 'My sleep pattern is',
      qOptions: [
        { id: 1, value: 'Light Interrupted Sleep' },
        { id: 2, value: 'Moderate (6-8 hrs)' },
        { id: 3, value: 'Feels sleepy and lazy after waking up' },
      ],
      qInfo:
        'Sleep is an important factor for normal biological function. It is considered the quality and quantity of sleep is essential to our own health and well being as our dietary habits. Any changes in inner-self starts affecting the sleep pattern',
      qTag: 'sleepPattern',
      qAnswers: [false, false, false],
    },
    {
      qId: 6,
      qLabel: 'Body',
      qOptions: [
        { id: 1, value: 'Pain' },
        { id: 2, value: 'Burning Sensation' },
        { id: 3, value: 'Itching' },
      ],
      qInfo: 'Lorem ipsum is simply a dummy text of.',
      qTag: 'body',
      qAnswers: [false, false, false],
    },
  ],
};

export { NEW_SCRIPT, PRAKRITI_ASSESSMENT_SCRIPT };
