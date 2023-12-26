import React from "react";
import { Comments } from "./Comments";
import { Likes } from "./Likes";

export const Blogpost = ({ post, handleSingleblog }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        onClick={() => handleSingleblog(post._id)}
        key={post._id} // Assuming each post has a unique identifier like 'id'
        className="w-11/12 md:w-[50rem] p-6 bg-transparent backdrop-blur-3xl border-2 border-transparent rounded-2xl md:h-64 shadow-sm shadow-gray-400  dark:shadow-none hover:border-gray-200 dark:hover:border-gray-200 cursor-pointer transition-all duration-200 ease-in-out flex flex-col justify-center items-center gap-2 relative z-20"
      >
        <h5
          id="title"
          className="mb-2 text-2xl md:max-h-20 overflow-hidden font-bold tracking-tight text-gray-50 dark:text-white capitalize"
        >
          {post.title}
        </h5>
        <p
          id="author"
          className="text-gray-100 dark:text-gray-300 playfair uppercase mb-1"
        >
          ~ {post.author}
        </p>
        <p
          id="content"
          className="font-thin h-12 text-gray-100 dark:text-gray-400 quicksand  overflow-hidden"
        >
          {post.content}
        </p>
        <p
          id="tags"
          className=" text-sm font-extralight border rounded-full text-gray-100 opacity-50 roboto p-1 pl-2 pr-2 text-center"
        >
          {post.tags.join(" ")}
        </p>
      </div>
      <div className="flex ">
        <Likes postId={post._id} likeArray={post.likes}/>
        <Comments commentArray={post.comments}/>
      </div>
    </div>
  );
};

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, alias ullam consequuntur aperiam expedita optio ex deleniti ratione corrupti repellendus quaerat hic maiores dignissimos unde saepe tenetur laboriosam placeat. Optio.
