import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/Api";
import { Comments } from "../BlogsPage/Comments";
import { Likes } from "../BlogsPage/Likes";
import { selectUserInfo } from "../../../slices/authSlice";
import { useSelector } from "react-redux";
import { Loading } from "../../UI/Loading";

export const SearchedPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [showTagsAndDate, setTagsAndDate] = useState("hidden");
  const userInfo = useSelector(selectUserInfo);
  const readmore = () => {
    if (showTagsAndDate === "hidden") {
      setTagsAndDate("flex");
    } else {
      setTagsAndDate("hidden");
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getPostById(id);
        setPostData(response);
      } catch (error) {
        console.error("Error fetching post data:", error);
        // Handle error as needed
      }
    };

    fetchPostData();
  }, [id]);

  return (
    <div>
      {postData ? (
        <>
          <div className="dark:bg-black primary-color text-3xl w-full flex flex-col gap-8 justify-start items-center">
            <div
              key={postData.post._id} // Assuming each post has a unique identifier like 'id'
              className="w-11/12 md:w-3/4 p-6 dark:border-gray-700 flex flex-col pb-1 items-center justify-between entry-animation border-t"
            >
              <div className="flex flex-col gap-2 items-center justify-center overflow-auto">
                <h5
                  id="title"
                  className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize"
                >
                  {postData.post.title}
                </h5>
                <p
                  id="author"
                  className="text-gray-700 dark:text-gray-300 playfair text-xl text-center uppercase mb-1"
                >
                  ~ {postData.post.author}
                </p>
                <p
                  id="content"
                  className="font-thin text-gray-700 h-full dark:text-gray-400 quicksand p-1 text-sm md:text-base text-center overflow-auto"
                >
                  {postData.post.content}
                </p>
                <p
                  id="tags"
                  className=" text-sm font-extralight border rounded-full text-black border-black dark:border-white dark:text-gray-100 opacity-50 roboto p-1 pl-2 pr-2 text-center"
                >
                  {postData.post.tags.join(" ")}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Likes
                postId={postData.post._id}
                likeArray={postData.post.likes}
                userInfo={userInfo}
              />
              <Comments
                commentArray={postData.post.comments}
                userInfo={userInfo}
                postId={postData.post._id}
              />
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
                published: {postData.post.publishDate.substring(0, 10)}
              </p>
              <p
                id="updatedAt"
                className="text-xs font-extralight text-gray-900 dark:text-gray-100 italic pt-1 text-center"
              >
                updated: {postData.post.updatedAt.substring(0, 10)}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full">
          <Loading />
        </div>
      )}
    </div>
  );
};
