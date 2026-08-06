import type { CheerUpMessage, StepData } from "@/types";
import type { MakeItPost } from "@/types/makeIt";
import type {
  MyPageStat,
  MyPageUser,
  NtcCard,
  RecentMakeItPost,
} from "@/types/myPage";

export const cheerUpMessages: CheerUpMessage[] = [
  {
    id: 1,
    text: "오늘의 선택이 내일의 나를 조금씩 만들어간다 그러니까 최선을 다하자",
    time: "2:00pm",
    authorId: "user123",
  },
  {
    id: 2,
    text: "Finish! You've got this!",
    time: "1:45pm",
    authorId: "system",
  },
  {
    id: 3,
    text: "Don't forget to check today's",
    time: "12:30pm",
    authorId: "system",
  },
  {
    id: 4,
    text: "Your English habit starts today",
    time: "11:10am",
    authorId: "system",
  },
  {
    id: 5,
    text: "Consistency is the key to language learning",
    time: "9:00am",
    authorId: "system",
  },
  {
    id: 1,
    text: "오늘의 선택이 내일의 나를 조금씩 만들어간다 그러니까 최선을 다하자",
    time: "2:00pm",
    authorId: "system",
  },
  {
    id: 2,
    text: "Finish! You've got this!",
    time: "1:45pm",
    authorId: "system",
  },
  {
    id: 3,
    text: "Don't forget to check today's",
    time: "12:30pm",
    authorId: "system",
  },
  {
    id: 4,
    text: "Your English habit starts today",
    time: "11:10am",
    authorId: "user123",
  },
  {
    id: 5,
    text: "Consistency is the key to language learning",
    time: "9:00am",
    authorId: "system",
  },
];

export const MAKE_IT_POSTS: MakeItPost[] = [
  {
    id: "1",
    content:
      "The morning light breaks through the curtains, reminding us that every day is a new beginning worth embracing fully.",
    likes: 5,
    date: "2025.11.21",
    author: "Ezi Park",
  },
  {
    id: "2",
    content:
      "Words are the bridges we build between our thoughts and the world outside, connecting hearts across distances and time.",
    likes: 3,
    date: "2025.11.21",
    author: "Ezi Park",
  },
  {
    id: "3",
    content:
      "In the silence of study, each sentence becomes a stepping stone toward fluency and deeper understanding of the world.",
    likes: 7,
    date: "2025.11.20",
    author: "Jay Kim",
  },
  {
    id: "4",
    content:
      "She walked slowly down the winding path, collecting fragments of memories like smooth stones along the river way.",
    likes: 2,
    date: "2025.11.20",
    author: "Jay Kim",
  },
  {
    id: "5",
    content:
      "The secret to learning any language lies not in perfection, but in the courage to make beautiful and meaningful mistakes.",
    likes: 12,
    date: "2025.11.19",
    author: "Min Lee",
  },
  {
    id: "6",
    content:
      "Time moves like a river — sometimes rushing forward, sometimes still — but always carrying us into tomorrow without pause.",
    likes: 4,
    date: "2025.11.19",
    author: "Min Lee",
  },
  {
    id: "7",
    content:
      "Between the lines of every sentence lives a world waiting to be discovered by those who dare to read carefully.",
    likes: 8,
    date: "2025.11.18",
    author: "Soo Han",
  },
  {
    id: "8",
    content:
      "He opened the old notebook and found that every word written long ago still held the warmth of those precious days.",
    likes: 6,
    date: "2025.11.18",
    author: "Soo Han",
  },
  {
    id: "9",
    content:
      "Learning is not filling a bucket but lighting a fire that burns brighter with every new word you discover today.",
    likes: 9,
    date: "2025.11.17",
    author: "Hana Choi",
  },
  {
    id: "10",
    content:
      "The city never sleeps, and neither does the curious mind searching for meaning in the language that surrounds it.",
    likes: 1,
    date: "2025.11.17",
    author: "Hana Choi",
  },
  {
    id: "11",
    content:
      "Practice doesn't make perfect; practice makes progress, and progress is the only thing truly worth celebrating each day.",
    likes: 11,
    date: "2025.11.16",
    author: "Tom Park",
  },
  {
    id: "12",
    content:
      "Her words carried the weight of a thousand unsaid things, each syllable becoming a small universe of deep feeling.",
    likes: 3,
    date: "2025.11.16",
    author: "Tom Park",
  },
];

// ponytail: 내 문장 API가 없어 공용 목록의 작성자만 바꿔 재사용. API 연동 시 교체.
export const MY_SENTENCE_POSTS: MakeItPost[] = MAKE_IT_POSTS.map((p) => ({
  ...p,
  author: "Ezi Park",
}));

export const STEP_DATA: StepData[] = [
  {
    ko: "저 공룡은 엄청나게 커!",
    en: "That dinosaur is ginormous!",
    words: [
      { en: "dinosaur", ko: "공룡" },
      { en: "ginormous", ko: "엄청나게 큰" },
    ],
  },
  {
    ko: "오늘은 커피를 마시지 않았어.",
    en: "I didn't drink coffee today.",
    words: [
      { en: "drink", ko: "마시다" },
      { en: "coffee", ko: "커피" },
    ],
  },
  {
    ko: "그녀는 나보다 빨리 달려.",
    en: "She runs faster than me.",
    words: [
      { en: "runs", ko: "달리다" },
      { en: "faster", ko: "더 빨리" },
    ],
  },
  {
    ko: "우리는 어제 늦게까지 일했어.",
    en: "We worked late yesterday.",
    words: [
      { en: "worked", ko: "일했다" },
      { en: "yesterday", ko: "어제" },
    ],
  },
  {
    ko: "나는 지금 집에 가고 있어.",
    en: "I'm on my way home now.",
    words: [
      { en: "way", ko: "길" },
      { en: "home", ko: "집" },
    ],
  },
];

export const MY_PAGE_USER: MyPageUser = {
  name: "EZ PARK",
  email: "ezpark@naver.com",
  issuedYear: "2026.03.28",
};

export const MY_PAGE_RECENTS: RecentMakeItPost[] = [
  {
    date: "July.2",
    title: "Have you ever been in love?",
    body: "Have you ever been in love?\nI have never been in love before. I watched a youtube video. There were a white woman and a white man. They were doing everything to look like Jimin, to his skin.",
    views: 999,
    likes: 999,
  },
  {
    date: "July.1",
    title: "What did you do last weekend?",
    body: "What did you do last weekend?\nI stayed home and read a book about language learning. It said that reading every day is the fastest way to grow your vocabulary, so I decided to try it for a month.",
    views: 312,
    likes: 87,
  },
  {
    date: "June.30",
    title: "Where would you like to travel?",
    body: "Where would you like to travel?\nI want to visit a small town by the sea. I imagine walking along the shore in the morning and writing a few English sentences about everything I see there.",
    views: 128,
    likes: 45,
  },
];

export const MY_PAGE_STATS: MyPageStat[] = [
  { label: "Times Studied", value: 60, key: "timeStudied", color: "bg-yellow" },
  { label: "Times Written", value: 24, key: "timesWritten", color: "bg-gray4" },
  {
    label: "Days Attended",
    value: 182,
    key: "daysAttended",
    color: "bg-purple",
  },
];

export const MY_PAGE_CARD: NtcCard = {
  holderName: "EZI PARK",
  webUrl: "not-tomorrow-club.com",
  dailyLimit: "5 Sentences",
  expire: "WHEN YOU STOP TRYING",
  grade: "NEW Evergreen",
  issuedAt: "YYYY.MM.DD",
  signatureName: "Park Ezi",
  cardNo: "No. 00001",
  serialNo: "0000052026",
};
