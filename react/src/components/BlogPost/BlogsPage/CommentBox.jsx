import React from "react";
import { selectUserInfo } from "../../../slices/authSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getComments, createComment } from "../../services/Api";
import { Loading } from "../../UI/Loading";
import toast, { Toaster } from "react-hot-toast";

export const CommentBox = ({
  handleCommentBox,
  postId,
  handleCommentsCount,
}) => {
  const userInfo = useSelector(selectUserInfo);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setisLoading] = useState(true);

  const handleCreateComment = async (event) => {
    event.preventDefault();
    try {
      setisLoading(true);
      const data = await createComment({
        postId,
        user: userInfo._id,
        content,
        token: userInfo.token,
      });
    } catch (error) {
      if (!userInfo) {
        toast.error("Sign in is required");
      } else toast.error(error);
    } finally {
      fetchComments();
      handleCommentsCount(comments.length)
      setContent("");
    }
  };
  const fetchComments = async () => {
    try {
      const commentsData = await getComments(postId);
      const sortedComments = commentsData.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        if (isNaN(dateA) || isNaN(dateB)) {
          console.error("Invalid date format");
          return 0;
        }
        return dateB - dateA;
      });
      setComments(sortedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <>
      <div className="z-51 h-screen w-screen bg-transparent fixed top-0 left-0 backdrop-blur-md"></div>
      <Toaster />
      <div className="fixed bottom-2 md:w-1/3 z-51 right-2 w-10/12 overflow-auto h-screen-90 rounded-lg border border-gray-400 flex flex-col justify-between gap-2 items-center bg-gray-100 dark:bg-gray-700">
        <div className="text-gray-500 flex w-full p-2 gap-2 items-center">
          <button
            className="uppercase text-black dark:text-white"
            onClick={handleCommentBox}
          >
            ✕
          </button>
          <p className="dark:text-gray-300 text-black flex-grow text-center">
            Comment Section
          </p>
        </div>

        <div className="w-full overflow-auto h-full flex flex-col items-start">
          {isLoading ? (
            <div className="w-full h-full">
              <Loading />
            </div>
          ) : (
            comments.map((comment) => (
              <article
                key={comment._id} // Use a unique key for each comment
                className="p-6 text-base bg-gray-100 border-t border-gray-200 w-full dark:border-gray-700 dark:bg-gray-700"
              >
                <footer className="flex justify-between items-center mb-2">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    {/* Adjust the profile image source */}
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                      alt={comment.user.name} // Use actual user name if available
                    />
                    {comment.user.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <time>{comment.createdAt.substring(0, 10)}</time>
                  </p>
                </footer>
                <p className="text-gray-500 text-left text-xs md:text-sm dark:text-gray-400">
                  {comment.content}
                </p>
              </article>
            ))
          )}
        </div>

        <form
          method="POST"
          className="w-full flex gap-1 justify-center items-center"
          onSubmit={handleCreateComment}
        >
          <label htmlFor="comment" className="w-full m-2">
            <input
              type="text"
              id="first_name"
              className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your comment"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
          </label>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};
