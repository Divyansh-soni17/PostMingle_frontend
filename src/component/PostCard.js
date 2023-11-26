import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addPostComment } from "../apis/posts-api";
import Smallloader from "./Smallloader";

const PostCard = ({ post, fetchData }) => {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentSearchTerm, setCommentSearchTerm] = useState("");
  const [filteredComments, setFilteredComments] = useState(post.comments);
  const [loading, setLoading] = useState(false);

  const loadComments = () => {
    setShowComments(!showComments);
    setCommentSearchTerm("");
    setFilteredComments(post.comments);
  };

  const handleAddComment = () => {
    const isAuthenticated = localStorage.getItem("token");

    if (isAuthenticated) {
      setShowCommentModal(true);
    } else {
      // Redirect to the login page if the user is not authenticated
      navigate("/login"); // Update with the correct path to your login page
    }
  };

  const handleCloseModal = () => {
    setShowCommentModal(false);
    setNewComment(""); // Reset the new comment input
  };

  const handleAddCommentSubmit = async () => {
    const postId = post._id;
    setLoading(true);
    try {
      const { data } = await addPostComment(postId, newComment);
      // Optionally, you can refresh the comments after adding a new comment

      fetchData();
      // Close the modal
      setShowComments(false);
      handleCloseModal();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentSearch = () => {
    // Perform comment search and update filteredComments
    const searchTermLowerCase = commentSearchTerm.toLowerCase();
    const filtered = post.comments.filter((comment) =>
      comment.message.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredComments(filtered);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-4 rounded-md mb-4">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-gray-600 mb-2">{post.message}</p>
      <p className="text-sm text-gray-500">Writer: {post.writer}</p>

      <div className="flex justify-between my-2">
        <button
          onClick={loadComments}
          className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2 hover:bg-blue-600 focus:outline-none"
        >
          {showComments ? "Hide Comments" : "Load Comments"}
        </button>

        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2 hover:bg-blue-600 focus:outline-none"
        >
          Add Comment
        </button>
      </div>

      {showCommentModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75  flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-[18.5rem]">
            <label className="block mb-2">Enter your comment:</label>
            <textarea
              rows="4"
              className="w-full border p-2 mb-2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCommentSubmit}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                {loading ? <Smallloader /> : "Add Comment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showComments && (
        <div className="mt-5 mb-3 p-4 rounded-md bg-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Comments</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search comments"
                value={commentSearchTerm}
                onChange={(e) => setCommentSearchTerm(e.target.value)}
                className="border p-1 rounded-md"
              />
              <button
                onClick={handleCommentSearch}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Search
              </button>
            </div>
          </div>

          {filteredComments.map((comment, index) => (
            <div key={index} className="mb-2">
              <p className="text-gray-600">{comment.message}</p>
              <p className="text-sm text-gray-500">
                Comment Writer: {comment.commentwriter}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
