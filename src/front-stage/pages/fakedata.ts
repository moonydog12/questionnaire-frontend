export const survey = {
  title: '獨角獸是世界上最美的動物',
  description:
    '歡迎來到奇幻生物問卷！這份問卷旨在探索您對奇幻生物的喜好、想像與偏好。無論您是否是奇幻愛好者，您的回答都將幫助我們了解大家對這些神秘生物的看法。感謝您的參與！',
  questions: [
    {
      id: 1,
      type: 'single-choice',
      questionText: '在以下的奇幻生物中，您最喜歡哪一種？',
      options: [
        {
          optionId: 'a',
          optionText: '獨角獸',
        },
        {
          optionId: 'b',
          optionText: '紅龍',
        },
        {
          optionId: 'c',
          optionText: '鳳凰',
        },
        {
          optionId: 'd',
          optionText: '狼人',
        },
        {
          optionId: 'e',
          optionText: '精靈',
        },
      ],
    },
    {
      id: 2,
      type: 'multiple-choice',
      questionText: '您認為獨角獸應該具備哪些特徵？（可複選）',
      options: [
        {
          optionId: 'a',
          optionText: '能夠治癒傷口的神奇力量',
        },
        {
          optionId: 'b',
          optionText: '閃亮的銀色或白色毛髮',
        },
        {
          optionId: 'c',
          optionText: '能夠飛行的翅膀',
        },
        {
          optionId: 'd',
          optionText: '發光的獨角',
        },
        {
          optionId: 'e',
          optionText: '與自然精靈溝通的能力',
        },
      ],
    },
    {
      id: 3,
      type: 'single-choice',
      questionText: '如果可以在現實中見到一隻奇幻生物，您會選擇哪一種？',
      options: [
        {
          optionId: 'a',
          optionText: '獨角獸',
        },
        {
          optionId: 'b',
          optionText: '巨龍',
        },
        {
          optionId: 'c',
          optionText: '妖精',
        },
        {
          optionId: 'd',
          optionText: '人魚',
        },
        {
          optionId: 'e',
          optionText: '矮人',
        },
      ],
    },
    {
      id: 4,
      type: 'text',
      questionText: '請描述您心目中的獨角獸的外觀和特徵。',
    },
    {
      id: 5,
      type: 'single-choice',
      questionText: '如果您有機會飼養一隻奇幻生物，您會選擇哪一種？',
      options: [
        {
          optionId: 'a',
          optionText: '迷你獨角獸',
        },
        {
          optionId: 'b',
          optionText: '小型火龍',
        },
        {
          optionId: 'c',
          optionText: '水晶鳳凰',
        },
        {
          optionId: 'd',
          optionText: '森林精靈',
        },
      ],
    },
    {
      id: 6,
      type: 'multiple-choice',
      questionText: '您認為奇幻生物應該生活在什麼樣的環境中？（可複選）',
      options: [
        {
          optionId: 'a',
          optionText: '魔法森林',
        },
        {
          optionId: 'b',
          optionText: '高山雪地',
        },
        {
          optionId: 'c',
          optionText: '湖邊草原',
        },
        {
          optionId: 'd',
          optionText: '彩虹之間的天空',
        },
        {
          optionId: 'e',
          optionText: '遠離人煙的秘境',
        },
      ],
    },
  ],
};
