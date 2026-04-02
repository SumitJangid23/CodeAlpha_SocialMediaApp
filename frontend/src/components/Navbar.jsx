import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <motion.div
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/70 border-b border-white/10 shadow-md"
    >
      <div className="flex justify-between items-center px-4 py-3">

        
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Sa<span className="text-yellow-400">J</span>
        </h1>

        
        <div className="hidden md:flex gap-6 text-gray-300">
          <Link to="/feed" className="hover:text-yellow-400 transition">
            Feed
          </Link>

          <Link to="/search" className="hover:text-yellow-400 transition">
            Search
          </Link>

          <Link to="/profile" className="hover:text-yellow-400 transition">
            Profile
          </Link>
        </div>

        
        <button
          onClick={logout}
          className="hidden md:block bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1 rounded text-black text-sm hover:scale-105 transition"
        >
          Logout
        </button>

        
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setOpen(!open)}
        >
          <FaBars />
        </button>
      </div>

      
      <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{
    opacity: open ? 1 : 0,
    y: open ? 0 : -20,
    display: open ? "flex" : "none"
  }}
  className="md:hidden flex-col items-center gap-6 py-6 bg-black text-white border-t border-white/10"
>
  <Link
    to="/feed"
    onClick={() => setOpen(false)}
    className="text-lg"
  >
    Feed
  </Link>

  <Link
    to="/search"
    onClick={() => setOpen(false)}
    className="text-lg"
  >
    Search
  </Link>

  <Link
    to="/profile"
    onClick={() => setOpen(false)}
    className="text-lg"
  >
    Profile
  </Link>

  <button
    onClick={logout}
    className="bg-yellow-400 px-5 py-2 rounded text-black"
  >
    Logout
  </button>
</motion.div>
    </motion.div>
  );
}

export default Navbar;