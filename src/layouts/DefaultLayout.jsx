import { Outlet, useLocation } from "react-router-dom";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function DefaultLayout() {
  const location = useLocation();
  const hideFooter =
    location.pathname.startsWith("/learning") ||
    location.pathname.startsWith("/review");

  return (
    <div className="flex flex-col h-screen ">
      <Header />
      <main className="flex-1 bg-yellow px-[10rem]  flex flex-col items-center">
        <div className="w-full bg-red max-w-[70.25rem] h-full pt-[17.56vh]">
          <Outlet />
        </div>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
