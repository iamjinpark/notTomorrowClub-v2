import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import { RouterGuard } from "./RouterGuard";
import { LearningDataLayout } from "@/context/LearningDataContext";

// pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Learning from "@/pages/Learning";
import Review from "@/pages/Review";
import MakeIt from "@/pages/MakeIt";
import Tracker from "@/pages/Tracker";
import Notice from "@/pages/Notice";
import MyPage from "@/pages/MyPage";
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

      // 로그인시 접근 가능한 페이지
      {
        element: <RouterGuard />,
        children: [
          // 학습 데이터를 공유하는 라우트 그룹 (API 1회 호출)
          {
            element: <LearningDataLayout />,
            children: [
              { path: "learning", element: <Learning /> },
              {
                element: <RouterGuard />,
                children: [{ path: "review", element: <Review /> }],
              },
            ],
          },
          { path: "make-it", element: <MakeIt /> },
          { path: "tracker", element: <Tracker /> },
          { path: "notice", element: <Notice /> },
          { path: "mypage", element: <MyPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
