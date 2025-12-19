import { Outlet } from "react-router-dom";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-1 px-[10rem] pt-[8rem]">
        <div className="w-full max-w-[70.25rem] mx-auto mb-[11.625rem]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
