import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "@/assets/img/logo.svg";
import CLOSE_ICON_WHITE from "@/assets/img/closeIconWhite.svg";
import ProfileMenu from "@/components/common/ProfileMenu";
import { ATTENDANCE_DAYS } from "@/api/dummyData";
import { useAuth } from "@/hooks/useAuth";
import { useGoLogin } from "@/hooks/useGoLogin";

function Header() {
  const { pathname } = useLocation();
  const { isLoggedIn: isLogin, isLoading } = useAuth();
  const goLogin = useGoLogin();
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
    <header className="font-roboto border-gray1 fixed top-0 left-0 z-50 flex w-full items-center justify-between overflow-visible border-b border-b-[0.6px] bg-white px-4 py-4">
      <div>
        <Link to="/">
          <img src={logoImage} alt="NTC 로고" className="h-[1.5rem] w-auto" />
        </Link>
      </div>

      <div>
        <nav>
          <ul className="text-black flex flex-row gap-[26px] text-base font-semibold">
            <li>
              <Link to="/make-it">Make it</Link>
            </li>
            <li>
              <Link to="/tracker">Tracker</Link>
            </li>
            <li>
              <Link to="/notice">Notice</Link>
            </li>
            {/*
              로그인 여부로 라벨이 바뀌어(About / My Page) nav 폭이 흔들린다.
              가장 넓은 라벨을 숨긴 채 깔아 자리를 고정한다 (px 하드코딩 회피).
              복구 전에 그리면 로그인 사용자에게 About이 잠깐 보이므로 비워둔다.
            */}
            <li className="grid">
              <span aria-hidden className="invisible col-start-1 row-start-1">
                My Page
              </span>
              <span className="col-start-1 row-start-1">
                {isLoading ? null : isLogin ? (
                  <Link to="/mypage">My Page</Link>
                ) : (
                  <span className="relative">
                    <Link to="/about">About</Link>
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
              </span>
            </li>
          </ul>
        </nav>
      </div>

      {/*
        폭을 로그인 여부와 무관하게 고정한다 (시안: 칩 82 + gap 10 + 아바타 26).
        세션 복구 중에는 비워두되 자리는 잡아둬야 헤더가 리플로우되지 않는다.
      */}
      <div className="flex h-[26px] w-[118px] items-center justify-end gap-[10px]">
        {isLoading ? null : isLogin ? (
          <>
            <div className="bg-gray5 en-caption-1 text-black flex h-[24px] w-[82px] items-center justify-center rounded-[3px] leading-4">
              + {ATTENDANCE_DAYS} days
            </div>
            <ProfileMenu />
          </>
        ) : (
          <button
            type="button"
            className="bg-gray5 en-caption-1 text-black rounded-sm px-2 py-1 leading-4"
            onClick={goLogin}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
