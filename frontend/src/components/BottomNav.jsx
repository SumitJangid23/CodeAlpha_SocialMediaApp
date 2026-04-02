import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";

function BottomNav() {
  const location = useLocation();

  const linkStyle = (path) =>
    `flex flex-col items-center text-xs ${
      location.pathname === path ? "text-yellow-400" : "text-gray-400"
    }`;

  return (
    <div className="fixed bottom-0 w-full bg-black/90 backdrop-blur-lg border-t border-white/10 flex justify-around py-2 md:hidden z-50">

      <Link to="/feed" className={linkStyle("/feed")}>
        <FaHome size={20} />
        Feed
      </Link>

      <Link to="/search" className={linkStyle("/search")}>
        <FaSearch size={20} />
        Search
      </Link>

      <Link to="/profile" className={linkStyle("/profile")}>
        <FaUser size={20} />
        Profile
      </Link>

    </div>
  );
}

export default BottomNav;