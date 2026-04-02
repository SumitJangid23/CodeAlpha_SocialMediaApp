import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user._id);

    window.location.href = "/feed";
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

   
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-600 animate-pulse opacity-80"></div>

    
      <div className="absolute inset-0 bg-black/60"></div>

   
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-80"
      >
       
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Welcome to <span className="text-yellow-300">SaJ</span>
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Login to your account
        </p>

       
        <div className="flex flex-col gap-4">

        
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-300"
            onChange={(e) => setEmail(e.target.value)}
          />

        
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pr-10 rounded bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-300"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

       
        <button
          onClick={handleLogin}
          className="w-full mt-5 bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded text-white font-semibold hover:scale-105 transition"
        >
          Login
        </button>

        
        <div className="text-center mt-4 text-gray-300 text-sm">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-yellow-300 hover:underline">
              Signup
            </a>
          </p>

          <p className="mt-2">
            <a href="/forgot" className="text-yellow-300 hover:underline">
              Forgot Password?
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;