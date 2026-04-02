import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { FaSearch, FaUserPlus } from "react-icons/fa";

function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const currentUserId = localStorage.getItem("userId");

  const searchUser = async () => {
    if (!query) return;

    const res = await axios.get(
      `http://localhost:5000/api/users/search/${query}`
    );
    setUsers(res.data);
  };

  
  const followUser = async (id) => {
    await axios.post(`http://localhost:5000/api/users/follow/${id}`, {
      userId: currentUserId
    });

    searchUser(); 
  };

  
  const isFollowing = (user) => {
    return user.followers?.includes(currentUserId);
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-2xl mx-auto px-4">

         
          <div className="flex items-center bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl px-3 py-2 mb-6">

            <FaSearch className="text-gray-400 mr-2" />

            <input
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            />

            <button
              onClick={searchUser}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1 rounded text-black text-sm hover:scale-105 transition"
            >
              Search
            </button>
          </div>

         
          {users.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No users found
            </p>
          ) : (
            users.map((u) => (
              <div
                key={u._id}
                className="flex items-center justify-between bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10 mb-4 hover:bg-white/20 transition"
              >

                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-400">{u.email}</p>
                </div>

              
                <button
                  onClick={() => followUser(u._id)}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition ${
                    isFollowing(u)
                      ? "bg-gray-600 text-white"
                      : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                  }`}
                >
                  <FaUserPlus />
                  {isFollowing(u) ? "Following" : "Follow"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </>
  );
}

export default Search;