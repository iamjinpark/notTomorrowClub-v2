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
  // 막대 높이 비율(0~1). 시안 값이며 value에서 계산되지 않는다.
  ratio: number;
  color: string;
}
