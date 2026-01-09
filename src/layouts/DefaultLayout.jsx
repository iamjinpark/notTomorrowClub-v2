import { Outlet, useLocation } from "react-router-dom";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function DefaultLayout() {
  const location = useLocation();
  const isLearningPage = location.pathname.startsWith("/learning");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="px-[10rem] pt-[8rem] overflow-hidden"
        style={{ height: `calc(100vh - 61px)` }}
      >
        <div className="w-full max-w-[70.25rem] mx-auto h-full ">
          <Outlet />
        </div>
      </main>
      {!isLearningPage && <Footer />}
    </div>
  );
}
