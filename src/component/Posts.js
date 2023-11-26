import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllPosts, addPost } from "../apis/posts-api";
import PostCard from "./PostCard";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostMessage, setNewPostMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const postsData = await getAllPosts();
      setPosts(postsData);
      setFilteredPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredPosts(filtered);
    setLoading(false);
  };

  const handleAddPost = async () => {
    try {
      // Assuming you have a function to validate the form inputs
      if (!validateForm()) {
        return;
      }
      setLoading(true);
      setShowAddPostForm(false);

      // Call the addPost function to add a new post

      await addPost(newPostTitle, newPostMessage);

      // After adding the post, fetch the updated list of posts
      const updatedPosts = await getAllPosts();
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);

      // Reset the form and close the modal or form
      setNewPostTitle("");
      setNewPostMessage("");
      setLoading(false);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const validateForm = () => {
    // Add your validation logic here
    // Return true if the form is valid, otherwise false
    return newPostTitle.trim() !== "" && newPostMessage.trim() !== "";
  };

  return (
    <>
      <div className="flex justify-center items-center space-x-7">
        <button
          onClick={() => {
            if (localStorage.getItem("token")) setShowAddPostForm(true);
            else navigate("/login");
          }}
          className="px-5 py-3 my-5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
        >
          Add Post
        </button>
        <div className="">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleSearch}
            className=" px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Add Post Form/Modal */}
      {showAddPostForm && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-[18.5rem]">
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              className="w-full border p-2 mb-2"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />

            <label className="block mb-2">Message:</label>
            <textarea
              rows="4"
              className="w-full border p-2 mb-2"
              value={newPostMessage}
              onChange={(e) => setNewPostMessage(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowAddPostForm(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPost}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Add Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Posts */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* Display Posts */}
          {filteredPosts && filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} fetchData={fetchData} />
            ))
          ) : (
            <p className="w-fit m-auto my-5 font-semibold">No posts found. Be the first to create a post!</p>
          )}
        </div>
      )}
    </>
  );
};

export default Posts;
