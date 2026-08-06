export interface MyPageUser {
  name: string;
  email: string;
  issuedYear: string;
}

export interface RecentMakeItPost {
  date: string;
  title: string;
  body: string;
  views: number;
  likes: number;
}

export interface MyPageStat {
  label: string;
  value: number;
  // 막대 높이는 value를 이 항목의 기준 일수로 나눠 계산한다
  key: keyof StudyDataStandard;
  color: string;
}

// 통계 그래프의 기준 일수. 시안 "Custom your study data standard" 모달에서 조정한다.
export interface StudyDataStandard {
  timeStudied: number;
  timesWritten: number;
  daysAttended: number;
}

export type MoodId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type NtcCardSide = "front" | "back";

export interface NtcCard {
  holderName: string;
  webUrl: string;
  dailyLimit: string;
  expire: string;
  grade: string;
  issuedAt: string;
  signatureName: string;
  // 뒷면 전용
  cardNo: string;
  serialNo: string;
}
