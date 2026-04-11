import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoImage from "@/assets/img/logo.svg";
import CLOSE_ICON_WHITE from "@/assets/img/closeIconWhite.svg";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // TODO: 실제 로그인 체크 로직으로 변경 필요
  const isLogin = false;
  const isHome = pathname === "/";

  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (isLogin || !isHome) return;
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => {
      clearTimeout(timer);
      setShowBubble(false);
    };
  }, [isLogin, isHome]);

  return (
    <header className="font-roboto border-charcoal fixed top-0 left-0 z-50 flex w-full items-center justify-between overflow-visible border-b border-b-[0.6px] bg-white px-4 py-4">
      <div>
        <Link to="/">
          <img src={logoImage} alt="NTC 로고" className="h-[1.5rem] w-auto" />
        </Link>
      </div>

      <div>
        <nav>
          <ul className="flex flex-row gap-7 font-medium">
            <li>
              <Link to="/make-it">make it</Link>
            </li>
            <li>
              <Link to="/tracker">tracker</Link>
            </li>
            <li>
              <Link to="/notice">notice</Link>
            </li>
            <li>
              {isLogin ? (
                <Link to="/mypage">my page</Link>
              ) : (
                <span className="relative">
                  <Link to="/about">about</Link>
                  {isHome && showBubble && (
                    <div className="absolute top-full left-1/2 z-[200] mt-[8px] flex -translate-x-1/2 flex-col items-center">
                      <div className="h-[8px] w-[11px] bg-black [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]" />
                      <div className="en-caption-2 flex items-center justify-between gap-[5px] rounded-none bg-black p-[6px] text-sm whitespace-nowrap text-white">
                        <span>Look at This Bro</span>
                        <button
                          type="button"
                          className="flex h-[14px] w-[14px] items-center"
                          onClick={() => setShowBubble(false)}
                        >
                          <img
                            src={CLOSE_ICON_WHITE}
                            alt=""
                            className="w-full"
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <button
          type="button"
          className="rounded-sm bg-[#D9D9D9] px-2 py-1 text-sm font-medium"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>

      {/* 로그인 시 프로필로 변경 */}
      {/* <div className="flex flex-row gap-[0.813rem]">
        <div className=" bg-gray5 px-[0.438rem] py-[0.313rem] rounded-[0.188rem]  text-xs font-medium font-roboto leading-[16px]">
          + 340 days
        </div>
        <div className="rounded-full w-[1.625rem] h-[1.625rem] bg-red flex items-center justify-center  text-xs font-medium font-roboto leading-[16px] ">
          E
        </div>
      </div> */}
    </header>
  );
}

export default Header;
