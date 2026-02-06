import { Link, useNavigate } from "react-router-dom";
import logoImage from "@/assets/img/logo.svg";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full font-roboto flex items-center justify-between px-4 py-3 border-b border-charcoal bg-white z-50">
      <div>
        <Link to="/">
          <img src={logoImage} alt="NTC 로고" className="h-[1.5rem] w-auto" />
        </Link>
      </div>

      <div>
        <nav>
          <ul className="flex flex-row gap-7 font-semibold">
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
              <Link to="/mypage">my page</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <button
          type="button"
          className="text-sm font-medium bg-[#D9D9D9] px-2 py-1 rounded-sm"
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
