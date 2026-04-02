import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          newPassword
        }
      );

      alert(res.data.message);
    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

     
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-600 opacity-80"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-80"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Reset Password
        </h2>

        <p className="text-gray-300 text-center mb-6 text-sm">
          Enter your email and new password
        </p>


        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-300"
          onChange={(e) => setEmail(e.target.value)}
        />

       
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-300"
          onChange={(e) => setNewPassword(e.target.value)}
        />

       
        <button
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded text-black font-semibold hover:scale-105 transition"
        >
          Reset Password
        </button>

       
        <p className="text-center text-gray-300 mt-4 text-sm">
          Remember password?{" "}
          <a href="/" className="text-yellow-300 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;