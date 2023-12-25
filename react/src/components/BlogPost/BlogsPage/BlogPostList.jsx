import React from "react";
import { Blogpost } from "./Blogpost";
import { useEffect, useState } from "react";
import { getAllPosts, getPostById } from "../../services/Api";
import { SingleBlog } from "./SingleBlog";
import { Loading } from "../../UI/Loading";

export const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singleBlog, setSingleBlog] = useState(false);

  const handleSingleblog = async (post_id) => {
    try {
      if (!singleBlog) {
        const data = posts.find(post => post._id === post_id);
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
          if (isNaN(dateA) || isNaN(dateB)) {
            console.error("Invalid date format");
            return 0; 
          }
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
    return (<div className="h-full w-screen">
      <Loading />
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
      <div className="text-black dark:text-white flex justify-center text-center md:mt-0">
        <div className="w-full overflow-y-auto flex flex-wrap gap-2 justify-center mb-5">
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
