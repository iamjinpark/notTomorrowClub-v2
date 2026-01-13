import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import { RouterGuard } from "./RouterGuard";

// pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Learning from "@/pages/Learning";
import Review from "@/pages/Review";
import MakeIt from "@/pages/MakeIt";
import Tracker from "@/pages/Tracker";
import Notice from "@/pages/Notice";
import MyPage from "@/pages/MyPage";
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
        path: "learning",
        element: <Learning />,
      },
      // 로그인시 접근 가능한 페이지
      {
        element: <RouterGuard />,
        children: [
          { path: "review", element: <Review /> },
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
