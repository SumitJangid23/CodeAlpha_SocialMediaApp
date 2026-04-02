import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await axios.post("http://localhost:5000/api/auth/signup", {
      name,
      email,
      password
    });

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-600 opacity-80"></div>

     
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-80"
      >
     
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Join <span className="text-yellow-300">SaJ</span>
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Create your account
        </p>

       
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-300"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-300"
          onChange={(e) => setEmail(e.target.value)}
        />

        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-300"
          onChange={(e) => setPassword(e.target.value)}
        />

        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded text-white font-semibold"
        >
          Signup
        </motion.button>

        <div className="text-center mt-4 text-gray-300 text-sm">
          <p>
            Already have an account?{" "}
            <a href="/" className="text-yellow-300 hover:underline">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;