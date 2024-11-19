import { Survey } from './interface';

const today = new Date();
const oneWeekLater = new Date();
oneWeekLater.setDate(today.getDate() + 7);

export const data: Survey[] = [
  {
    id: '1',
    startDate: today,
    endDate: oneWeekLater,
    status: '進行中',
    title: 'Unicorn Lover',
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
          { optionId: 'a', optionText: '獨角獸' },
          { optionId: 'b', optionText: '紅龍' },
          { optionId: 'c', optionText: '鳳凰' },
          { optionId: 'd', optionText: '狼人' },
          { optionId: 'e', optionText: '精靈' },
        ],
      },
      {
        id: '3',
        type: 'multiple-choice',
        questionText: '您認為奇幻生物應該生活在什麼樣的環境中？（可複選）',
        options: [
          { optionId: 'a', optionText: '魔法森林' },
          { optionId: 'b', optionText: '高山雪地' },
          { optionId: 'c', optionText: '湖邊草原' },
          { optionId: 'd', optionText: '彩虹之間的天空' },
          { optionId: 'e', optionText: '遠離人煙的秘境' },
        ],
      },
    ],
  },
  {
    id: '2',
    startDate: today,
    endDate: oneWeekLater,
    status: '進行中',
    title: 'Dragon Enthusiast',
    description:
      '歡迎來到「龍」問卷！這份問卷旨在了解您對龍的認識與看法，以及您心目中的龍的故事與象徵。無論是東方還是西方的龍，您的想法都將幫助我們更深入地探索這一主題。感謝您的參與！',
    questions: [
      {
        id: '1',
        type: 'text',
        questionText: '您認為龍在神話中象徵著什麼？請簡述。',
      },
      {
        id: '2',
        type: 'single-choice',
        questionText: '您最喜歡以下哪種類型的龍？',
        options: [
          { optionId: 'a', optionText: '火焰龍' },
          { optionId: 'b', optionText: '冰霜龍' },
          { optionId: 'c', optionText: '雷電龍' },
          { optionId: 'd', optionText: '海洋龍' },
          { optionId: 'e', optionText: '神龍' },
        ],
      },
      {
        id: '3',
        type: 'multiple-choice',
        questionText: '您認為龍應該擁有什麼樣的能力？（可複選）',
        options: [
          { optionId: 'a', optionText: '飛行能力' },
          { optionId: 'b', optionText: '吐火或吐冰' },
          { optionId: 'c', optionText: '操控自然力量' },
          { optionId: 'd', optionText: '預知未來' },
          { optionId: 'e', optionText: '治癒能力' },
        ],
      },
    ],
  },
];
