import { Survey } from './interface';

export const data: Survey = {
  title: '獨角獸是世界上最美的動物',
  description:
    '歡迎來到奇幻生物問卷！這份問卷旨在探索您對奇幻生物的喜好、想像與偏好。無論您是否是奇幻愛好者，您的回答都將幫助我們了解大家對這些神秘生物的看法。感謝您的參與！',
  questions: [
    {
      id: '1',
      type: 'text',
      questionText: '請描述您心目中的獨角獸的外觀和特徵。',
    },
    {
      id: '2',
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
      id: '3',
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
