import React from "react";
import { useState } from "react";
import { Comments } from "./Comments";
import { Likes } from "./Likes";

export const SingleBlog = ({ singlePost, handleSingleblog }) => {
  const [showTagsAndDate, setTagsAndDate] = useState("hidden");
  const readmore = () => {
    if (showTagsAndDate === "hidden") {
      setTagsAndDate("flex");
    } else {
      setTagsAndDate("hidden");
    }
  };

  return (
    <div
      key={singlePost._id}
      className="bg-transparent backdrop-blur-3xl text-3xl absolute w-full min-h-screen entry-animation1 top-0 flex flex-col gap-3 justify-start items-center z-50"
    >
      <p
        className=" text-gray-300 dark:text-gray-200 cursor-pointer hover:text-gray-400 hover:dark:text-white text-3xl "
        onClick={handleSingleblog}
      >
        ↜
      </p>
      <div
        key={singlePost._id} // Assuming each post has a unique identifier like 'id'
        className="w-11/12 md:w-1/2 h-[70vh] p-6 bg-gray-100 border box-shadow border-gray-200 rounded-2xl dark:bg-transparent dark:border-gray-700 flex flex-col pb-1 items-center justify-between "
      >
        <div className="flex flex-col gap-2 items-center justify-center overflow-auto">
          <h5
            id="title"
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize"
          >
            {singlePost.title}
          </h5>
          <p
            id="author"
            className="text-gray-700 dark:text-gray-300 playfair text-xl text-center uppercase mb-1"
          >
            ~ {singlePost.author}
          </p>
          <p
            id="content"
            className="font-thin text-gray-700 h-full dark:text-gray-400 quicksand p-1 text-sm md:text-base text-center overflow-auto"
          >
            {singlePost.content}
          </p>
          <p
            id="tags"
            className=" text-sm font-extralight border rounded-full text-black border-black dark:border-white dark:text-gray-100 opacity-50 roboto p-1 pl-2 pr-2 text-center"
          >
            {singlePost.tags.join(" ")}
          </p>
        </div>
      </div>
      <p
        className={`loto text-xs font-extralight text-gray-900 dark:text-gray-100 italic cursor-pointer`}
        onClick={readmore}
      >
        Read More
      </p>
      <div
        className={`w-1/2 ${showTagsAndDate} flex-col justify-center items-center bg-transparent`}
      >
        <p
          id="publishDate"
          className="text-xs font-extralight text-gray-900 dark:text-gray-100 italic pt-1 text-center"
        >
          published: {singlePost.publishDate.substring(0, 10)}
        </p>
        <p
          id="updatedAt"
          className="text-xs font-extralight text-gray-900 dark:text-gray-100 italic pt-1 text-center"
        >
          updated: {singlePost.updatedAt.substring(0, 10)}
        </p>
      </div>
    </div>
  );
};
