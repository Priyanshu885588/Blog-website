import React from "react";
import { Blogpost } from "./Blogpost";
import { useEffect, useState } from "react";
import { getAllPosts, getPostById } from "../../services/Api";
import { SingleBlog } from "./SingleBlog";

export const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singleBlog, setSingleBlog] = useState(false);

  const handleSingleblog = async (post_id) => {
    try {
      if (!singleBlog) {
        const data = await getPostById(post_id);
        setSinglePost(data);
      }
      setSingleBlog((preVisible) => !preVisible);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPosts();
        const sortedPosts = data.posts.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);

          // Check if the parsed dates are valid
          if (isNaN(dateA) || isNaN(dateB)) {
            console.error("Invalid date format");
            return 0; // Do not change the order if dates are invalid
          }

          // Sort in descending order (newest first)
          return dateB - dateA;
        });

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (error) {
    return (
      <div className="text-red-500 text-center mt-20 open-sans text-2xl dark:text-red-200">
        Error: {error}
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center flex-col gap-4 justify-center w-screen h-screen rounded-lg bg-gray-50 dark:bg-black z-50">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
          <div className="px-3 py-1 text-lg font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
      </div>
    );
  }
  if (singleBlog) {
    return (
      <SingleBlog singlePost={singlePost} handleSingleblog={handleSingleblog} />
    );
  }
  return (
    <>
      <div className="text-black dark:text-white flex justify-center text-center pt-7 bg-white dark:bg-black md:mt-0">
        <div className="w-full overflow-y-auto flex flex-wrap gap-2 justify-center mt-5 mb-5">
          {posts.map((post) => (
            <Blogpost
              post={post}
              key={post._id}
              handleSingleblog={handleSingleblog}
            />
          ))}
        </div>
      </div>
    </>
  );
};
