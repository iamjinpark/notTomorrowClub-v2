import { Outlet, useLocation } from "react-router-dom";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function DefaultLayout() {
  const location = useLocation();
  const hasFooter =
    location.pathname.startsWith("/learning") ||
    location.pathname.startsWith("/review");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="px-[9.875rem] pt-[7.75rem] overflow-hidden"
        style={{ height: `calc(100vh - 61px)` }}
      >
        <div className="w-full max-w-[70.25rem] mx-auto h-full ">
          <Outlet />
        </div>
      </main>
      {!hasFooter && <Footer />}
    </div>
  );
}
