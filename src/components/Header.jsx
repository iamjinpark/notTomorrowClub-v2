import { Link } from "react-router-dom";
import logoImage from "@/assets/img/logo.svg";

function Header() {
  return (
    <div className="font-roboto flex items-center justify-between p-4 border-b border-gray-200">
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
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Header;
