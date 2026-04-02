import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);

  const userId = localStorage.getItem("userId");


  const fetchUser = async () => {
    const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
    setUser(res.data);
  };

 
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts");

    const myPosts = res.data.filter(
      (p) => (p.userId?._id || p.userId) === userId
    );

    setPosts(myPosts);
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);


  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    await axios.put(
      `http://localhost:5000/api/users/upload/${userId}`,
      formData
    );

    setImage(null);
    fetchUser();
  };

  if (!user)
    return (
      <h2 className="text-white text-center mt-20">Loading...</h2>
    );

  return (
    <>
      <Navbar />

      <div className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-2xl mx-auto px-4">

        
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10 text-center mb-6">

         
            <img
              src={
                user.profilePic
                  ? `http://localhost:5000/uploads/${user.profilePic}?t=${Date.now()}`
                  : `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt=""
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-yellow-400 hover:scale-105 transition"
            />

          
            {image && (
              <img
                src={URL.createObjectURL(image)}
                className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border border-yellow-400"
              />
            )}

            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>

          
            <div className="flex justify-around mt-4 text-center">
              <div>
                <p className="font-bold text-lg">{posts.length}</p>
                <p className="text-gray-400 text-xs">Posts</p>
              </div>
              <div>
                <p className="font-bold text-lg">{user.followers.length}</p>
                <p className="text-gray-400 text-xs">Followers</p>
              </div>
              <div>
                <p className="font-bold text-lg">{user.following.length}</p>
                <p className="text-gray-400 text-xs">Following</p>
              </div>
            </div>

          
            <div className="mt-4 flex gap-3 justify-center">

              <label className="cursor-pointer bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition text-sm">
                Choose
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              <button
                onClick={uploadImage}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded text-black text-sm font-semibold hover:scale-105 transition"
              >
                Upload
              </button>

            </div>
          </div>

       
          <h3 className="mb-4 text-gray-300">My Posts</h3>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-center">
              No posts yet
            </p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white/10 backdrop-blur-lg p-3 rounded-lg mb-4 border border-white/10 hover:scale-[1.02] transition"
              >
                <p className="text-gray-200">{post.content}</p>

                {post.image && (
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    className="mt-2 rounded-lg"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </>
  );
}

export default Profile;