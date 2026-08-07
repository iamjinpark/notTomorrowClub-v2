import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import { LoginOverlayGuard, RouterGuard } from "./RouterGuard";
import { LearningDataLayout } from "@/context/LearningDataContext";

// pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Learning from "@/pages/Learning";
import Review from "@/pages/Review";
import MakeIt from "@/pages/MakeIt";
import MakeItCreate from "@/pages/MakeItCreate";
import Tracker from "@/pages/Tracker";
import Notice from "@/pages/Notice";
import MyPage from "@/pages/MyPage";
import MyPageCard from "@/pages/MyPageCard";
import MySentenceArchive from "@/pages/MySentenceArchive";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "notice",
        element: <Notice />,
      },

      // 학습 데이터를 공유하는 라우트 그룹 (API 1회 호출)
      {
        element: <LearningDataLayout />,
        children: [
          // 오버레이를 스크롤 진행도에 맞춰 띄워야 해서 페이지가 직접 처리한다
          { path: "learning", element: <Learning /> },
          {
            element: <RouterGuard />,
            children: [{ path: "review", element: <Review /> }],
          },
        ],
      },

      // 비로그인도 화면은 보여주고 오버레이로 로그인 유도
      {
        element: <LoginOverlayGuard />,
        children: [
          { path: "make-it", element: <MakeIt /> },
          { path: "tracker", element: <Tracker /> },
        ],
      },

      // 로그인 필수 — 개인 데이터이거나 쓰기 동작이라 오버레이로 가릴 게 없다
      {
        element: <RouterGuard />,
        children: [
          { path: "make-it/create", element: <MakeItCreate /> },
          { path: "mypage", element: <MyPage /> },
          { path: "mypage/sentences", element: <MySentenceArchive /> },
        ],
      },
    ],
  },
  // 시안에 사이트 헤더/푸터가 없고 배경이 전체 어두운 색이라 DefaultLayout 밖에 둔다
  {
    element: <RouterGuard />,
    children: [{ path: "mypage/card", element: <MyPageCard /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
