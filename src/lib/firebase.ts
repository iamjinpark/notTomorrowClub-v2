import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 값이 비면 firebase가 auth/invalid-api-key로 죽어서 원인을 찾기 어렵다
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error(".env에 VITE_FIREBASE_* 값을 채워주세요 (.env.example 참고)");
}

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

export const auth = getAuth(app);
