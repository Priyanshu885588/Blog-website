import React from "react";

export const SingleBlog = ({ singlePost, handleSingleblog }) => {
  return (
    <div className="bg-gray-900 text-3xl absolute w-full md:h-full entry-animation1 flex flex-col gap-3 justify-center items-center z-50">
      <p
        className=" text-gray-900 dark:text-gray-700 cursor-pointer hover:dark:text-white text-3xl "
        onClick={handleSingleblog}
      >
        ↜
      </p>
      <div
        key={singlePost.post._id} // Assuming each post has a unique identifier like 'id'
        className="w-11/12 md:w-1/2 h-5/6 p-6 bg-white border border-gray-200 rounded-2xl shadow dark:bg-transparent dark:border-gray-700 flex flex-col items-center"
      >
        <h5
          id="title"
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize"
        >
          {singlePost.post.title}
        </h5>
        <p
          id="author"
          className="text-gray-700 dark:text-gray-300 playfair uppercase mb-1"
        >
          ~ {singlePost.post.author}
        </p>
        <p
          id="content"
          className="font-thin text-gray-700 dark:text-gray-400 quicksand p-1 text-sm md:text-base text-left overflow-auto"
        >
          {singlePost.post.content}
        </p>
        <div>
          <p
            id="tags"
            className="text-xs font-extralight text-gray-700 dark:text-gray-500 italic pt-1 text-center"
          >
            #{singlePost.post.tags}
          </p>
          <p
            id="publishDate"
            className="text-xs font-extralight text-gray-700 dark:text-gray-500 italic pt-1 text-center"
          >
            published: {singlePost.post.publishDate}
          </p>
          <p
            id="updatedAt"
            className="text-xs font-extralight text-gray-700 dark:text-gray-500 italic pt-1 text-center"
          >
            updated: {singlePost.post.updatedAt}
          </p>
        </div>
      </div>
    </div>
  );
};
