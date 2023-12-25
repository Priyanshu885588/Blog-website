import React from "react";
import { Comments } from "./Comments";
import { Likes } from "./Likes";

export const Blogpost = ({ post, handleSingleblog }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        onClick={() => handleSingleblog(post._id)}
        key={post._id} // Assuming each post has a unique identifier like 'id'
        className="w-11/12 md:w-1/2 p-6 bg-transparent backdrop-blur-3xl border-2 border-transparent rounded-2xl shadow-sm shadow-gray-400  dark:shadow-none hover:border-gray-200 dark:hover:border-gray-200 cursor-pointer transition-all duration-200 ease-in-out flex flex-col justify-center items-center relative z-20"
      >
        <h5
          id="title"
          className="mb-2 text-2xl font-bold tracking-tight text-gray-50 dark:text-white capitalize"
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
          className="font-thin h-12 text-gray-100 dark:text-gray-400 quicksand p-1 overflow-hidden"
        >
          {post.content}
        </p>
        <p
          id="tags"
          className="text-xs font-extralight text-gray-900 dark:text-gray-500 italic pt-1 text-center w-1/2 h-5 overflow-hidden"
        >
          #{post.tags.join(" ")} {/* Assuming 'tags' is an array */}
        </p>
        <p
          id="publishDate"
          className="text-xs font-extralight text-gray-900 dark:text-gray-500 italic pt-1 text-center"
        >
          published: {post.publishDate.substring(0, 10)}
        </p>
        <p
          id="updatedAt"
          className="text-xs font-extralight text-gray-900 dark:text-gray-500 italic pt-1 text-center"
        >
          updated: {post.updatedAt.substring(0, 10)}
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
