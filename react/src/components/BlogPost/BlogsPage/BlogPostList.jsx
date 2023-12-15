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
  const [starter, setStarter] = useState(true);
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
    setTimeout(() => {
      setStarter(false);
    }, 3000);
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
      <div className="w-full h-screen bg-white dark:bg-gray-950 fixed z-20 flex flex-col justify-center gap-2">
        <p className="entry-animation border-b-2 text-3xl  text-white"></p>
        <p className="entry-animation border-b-2 text-3xl  text-white"></p>
        <p className="entry-animation border-b-2 text-3xl  text-white"></p>
      </div>
    );
  }
  if (singleBlog) {
    return <SingleBlog singlePost={singlePost} handleSingleblog={handleSingleblog}/>;
  }
  return (
    <>
      {starter && (
        <div className="w-full h-screen bg-white dark:bg-gray-950 fixed z-20 flex flex-col justify-center gap-2">
          <p className="entry-animation border-b-2 text-3xl  text-white"></p>
          <p className="entry-animation border-b-2 text-3xl  text-white"></p>
          <p className="entry-animation border-b-2 text-3xl  text-white"></p>
        </div>
      )}
      <div className="text-black dark:text-white flex justify-center text-center ">
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
