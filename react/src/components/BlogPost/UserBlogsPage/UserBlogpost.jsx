import React from "react";
import { useState } from "react";
import { Comments } from "../BlogsPage/Comments";
import { Likes } from "../BlogsPage/Likes";
import { deletePost } from "../../services/Api";
import toast, { Toaster } from "react-hot-toast";
import { Loading } from "../../UI/Loading";


export const UserBlogpost = ({ post, handleSingleblog, userInfo }) => {
  const [loading, setLoading] = useState(false);

  const performDeletePost  = async () =>{
    try {
        setLoading(true)
        const data = await deletePost({postId:post._id,token:userInfo.token})
    } catch (error) {
        toast.error('Error')
    }finally{
        window.location.reload();
        setLoading(false)
    }
  }

  if (loading) {
    return <div className="w-full h-full">
      <Loading/>
    </div>
  }
  
    return (
    <div className="flex flex-col justify-center items-center border-b pb-2 w-full border-black">
      <Toaster />
      <div
        onClick={() => handleSingleblog(post._id)}
        key={post._id} // Assuming each post has a unique identifier like 'id'
        className="w-11/12 md:w-[50rem] p-6 bg-transparent backdrop-blur-3xl rounded-2xl md:h-64 shadow-gray-400   hover:opacity-50 cursor-pointer transition-all duration-200 ease-in-out flex flex-col justify-center items-center gap-2 relative z-20"
      >
        <h5
          id="title"
          className="mb-2 text-2xl md:max-h-20 overflow-hidden font-bold tracking-tight text-black dark:text-white capitalize"
        >
          {post.title}
        </h5>
        <p
          id="author"
          className="text-gray-950 dark:text-gray-300 playfair uppercase mb-1"
        >
          ~ {post.author}
        </p>
        <p
          id="content"
          className="font-thin h-12 text-gray-900 dark:text-gray-400 quicksand  overflow-hidden"
        >
          {post.content}
        </p>
        <p
          id="tags"
          className=" text-sm font-extralight border rounded-full dark:text-gray-100 text-black border-black opacity-50 roboto p-1 pl-2 pr-2 text-center"
        >
          {post.tags.join(" ")}
        </p>
      </div>
      <div className="flex justify-center items-center p-2">
        <Likes postId={post._id} likeArray={post.likes} userInfo={userInfo} />
        <Comments
          commentArray={post.comments}
          userInfo={userInfo}
          postId={post._id}
        />
        <button
          className="text-red-500 hover:text-red-900 border-l-2 border-black pl-2 "
          onClick={performDeletePost}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, alias ullam consequuntur aperiam expedita optio ex deleniti ratione corrupti repellendus quaerat hic maiores dignissimos unde saepe tenetur laboriosam placeat. Optio.
