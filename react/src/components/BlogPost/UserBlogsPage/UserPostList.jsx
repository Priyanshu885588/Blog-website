import React from "react";
import { useEffect, useState } from "react";
import { UserBlogpost } from "./UserBlogpost";
import { SingleBlog } from "../BlogsPage/SingleBlog";
import { Loading } from "../../UI/Loading";
import { Link } from "react-router-dom";
import { useGetUserPostsQuery } from "../../../slices/usersApiSlice";
import { selectUserInfo } from "../../../slices/authSlice";
import { useSelector } from "react-redux";
import { deletePost } from "../../services/Api";

export const UserPostList = () => {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [singleBlog, setSingleBlog] = useState(false);
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const { data, isLoading, isError, refetch } = useGetUserPostsQuery(
    userInfo._id,
    {
      skip: !userInfo?._id,
    }
  );

  const performDeletePost = async (postId) => {
    try {
      setLoading(true);
      await deletePost({
        postId: postId,
        token: userInfo.token,
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      toast.error("Error");
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo._id) {
      refetch();
    }
  }, [userInfo?._id, refetch]);

  const handleSingleblog = async (post_id) => {
    try {
      if (!singleBlog) {
        const data = posts.find((post) => post._id === post_id);
        setSinglePost(data);
      }
      setSingleBlog((preVisible) => !preVisible);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data) {
      try {
        const sortedPosts = data.userPosts.slice();
        sortedPosts.sort((a, b) => {
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
        console.error("Error sorting posts:", error);
      }
    }
  }, [data]);

  if (isError) {
    return (
      <div className="bg-white dark:bg-gray-100 w-full flex flex-col justify-center items-center p-10 text-center mt-20 open-sans text-2xl text-red-400">
        No blog posts found for the specified user.
        <br />
        Why not start by adding your first post?
        <Link
          to="/add-blog"
          className="text-white bg-blue-500 hover:bg-blue-200 hover:text-gray-900 hover:dark:text-gray-900 w-28 p-2 mt-10 rounded-full text-xl md:text-lg text-center"
        >
          Add blogs
        </Link>
      </div>
    );
  }
  if (isLoading || loading) {
    return (
      <div className="h-full w-full">
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
            <UserBlogpost
              post={post}
              key={post._id}
              handleSingleblog={handleSingleblog}
              userInfo={userInfo}
              performDeletePost={performDeletePost}
            />
          ))}
        </div>
      </div>
    </>
  );
};
