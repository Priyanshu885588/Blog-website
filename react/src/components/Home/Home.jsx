import React from "react";
import { useState, useEffect } from "react";
import { getTopLikedPosts } from "../services/Api";
import { Loading } from "../UI/Loading";
import { SingleBlog } from "../BlogPost/BlogsPage/SingleBlog";
export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [singleBlog, setSingleBlog] = useState(null);

  const handleSingleblog = () =>{
    setSingleBlog(null)
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getTopLikedPosts();
        const sortedPosts = data.posts.sort(
          (a, b) => b.likes.length - a.likes.length
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }
  if(singleBlog) {
    return <SingleBlog singlePost={singleBlog} handleSingleblog={handleSingleblog}/>
  }
  return (
    <div className=" dark:text-white w-full h-[calc(100vh-7rem)] text-white flex flex-col justify-between items-center">
      <div className="md:w-1/2 w-11/12 flex flex-col justify-center items-center h-full gap-4 pb-2 md:m-0 m-2">
        <p className=" text-sm opacity-80 border-r-2 nunito pr-2">
          {posts[0].author}
        </p>
        <h1 className="md:text-4xl text-xl playfair font-extrabold italic text-center">
          {posts[0].title}
        </h1>
        <p className=" text-xs opacity-80 border rounded-full nunito p-1 pl-2 pr-2">
          {posts[0].tags[0]}
        </p>
        <button onClick={()=>setSingleBlog(posts[0])} className="border rounded-full md:text-sm hover:bg-white hover:text-black transition-all duration-500 text-sm open-sans p-2 pr-5 pl-5 backdrop-blur-xl">
          Read more
        </button>
      </div>
      <div className="w-full flex backdrop-blur-xl justify-evenly gap-4 min-h-52 items-center text-left p-9 flex-wrap">
        {posts.slice(1).map((post, index) => (
          <div key={post._id} onClick={()=>setSingleBlog(post)} className="md:w-48 w-full flex flex-col gap-2  border-b p-2 md:border-none cursor-pointer rounded-lg hover:text-yellow-400">
            <h1 className="text-base lato h-12 overflow-hidden">
              {post.title}
            </h1>
            <p className=" text-xs opacity-80 border-r nunito pr-2 w-fit">
              {post.author}
            </p>
            <p className=" text-xs opacity-80 border rounded-full nunito p-1 capitalize pl-2 pr-2 w-fit">
              {post.tags}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
