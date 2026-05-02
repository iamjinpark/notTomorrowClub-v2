export interface Word {
  en: string;
  ko: string;
}

export interface StepData {
  ko: string;
  en: string;
  words: Word[];
}

export interface CheerUpMessage {
  id: number;
  text: string;
  time: string;
  authorId: string;
}

export interface WeatherInfo {
  description: string;
  temp: number;
  windSpeed: number;
}

export interface LocationInfo {
  city: string | undefined;
  country: string | undefined;
}
