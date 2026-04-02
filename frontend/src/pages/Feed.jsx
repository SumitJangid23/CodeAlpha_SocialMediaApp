import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  
  const createPost = async () => {
    if (!content && !image) return;

    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", userId);
    if (image) formData.append("image", image);

    await axios.post("http://localhost:5000/api/posts", formData);

    setContent("");
    setImage(null);
    fetchPosts();
  };

  
  const likePost = async (id) => {
    await axios.post(`http://localhost:5000/api/posts/like/${id}`, {
      userId
    });
    fetchPosts();
  };

  
  const fetchComments = async (postId) => {
    const res = await axios.get(
      `http://localhost:5000/api/comments/${postId}`
    );

    setComments((prev) => ({
      ...prev,
      [postId]: res.data
    }));
  };

  const addComment = async (postId) => {
    if (!commentText[postId]) return;

    await axios.post(`http://localhost:5000/api/comments/${postId}`, {
      userId,
      text: commentText[postId]
    });

    setCommentText({
      ...commentText,
      [postId]: ""
    });

    fetchComments(postId);
  };

  
  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    fetchPosts();
  };

  
  const startEdit = (post) => {
    setEditingId(post._id);
    setEditText(post.content);
  };

  const saveEdit = async (id) => {
    await axios.put(`http://localhost:5000/api/posts/${id}`, {
      content: editText
    });

    setEditingId(null);
    fetchPosts();
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-2xl mx-auto px-4">

          {/* CREATE POST */}
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10 mb-6">

            <textarea
              placeholder="Share something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded bg-transparent border border-white/20 outline-none resize-none"
            />

            {/* IMAGE PREVIEW */}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                className="mt-3 rounded-lg"
              />
            )}

            <div className="flex justify-between items-center mt-3">
              <label className="cursor-pointer text-sm bg-white/10 px-3 py-2 rounded hover:bg-white/20 transition">
                Upload
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              <button
                onClick={createPost}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-2 rounded font-semibold text-black hover:scale-105 transition"
              >
                Post
              </button>
            </div>
          </div>

       
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10 mb-6"
            >

             
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    post.userId?.profilePic
                      ? `http://localhost:5000/uploads/${post.userId.profilePic}`
                      : "https://via.placeholder.com/40"
                  }
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-sm font-semibold">
                    {post.userId?.name || "User"}
                  </p>
                </div>
              </div>

             
              {editingId === post._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="p-2 rounded bg-black/40 outline-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(post._id)}
                      className="bg-green-500 px-3 py-1 rounded text-sm"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 px-3 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mb-3 text-gray-200">{post.content}</p>
              )}

             
              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  className="w-full rounded-lg mb-3"
                />
              )}

             
              <div className="flex items-center justify-between">

                <button
                  onClick={() => likePost(post._id)}
                  className={`flex items-center gap-2 ${
                    post.likes.includes(userId)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  <FaHeart />
                  {post.likes.length}
                </button>

               
                {post.userId?._id === userId && (
                  <div className="flex gap-4 text-gray-400">
                    <button onClick={() => startEdit(post)}>
                      <FaEdit />
                    </button>


        

                    <button onClick={() => deletePost(post._id)}>
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              {}
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    placeholder="Add a comment..."
                    value={commentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText({
                        ...commentText,
                        [post._id]: e.target.value
                      })
                    }
                    className="flex-1 p-2 rounded bg-black/40 outline-none"
                  />

                  <button
                    onClick={() => addComment(post._id)}
                    className="text-sm text-yellow-400"
                  >
                    Post
                  </button>
                </div>

                <button
                  onClick={() => fetchComments(post._id)}
                  className="text-xs text-gray-400 mt-2"
                >
                  View comments
                </button>

                {comments[post._id]?.map((c) => (
                  <p key={c._id} className="text-sm text-gray-300 mt-1">
                    {c.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </>
  );
}

export default Feed;