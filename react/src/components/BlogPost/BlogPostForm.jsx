import React from "react";
import { useFormik } from "formik";
import { formSchema } from "./schemas";
import { createPost } from "../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { selectUserInfo } from "../../slices/authSlice";
import { useSelector } from "react-redux";
import { Loading } from "../UI/Loading";
export const BlogPostForm = () => {
  const [loading, setLoading] = useState(false);
  const userinfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    tags: "",
    author: "",
    content: "",
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const tagsArray = values.tags.split(" ");
      values.tags = tagsArray;
      const updatedValues = {
        ...values,
        authorId: userinfo._id,
        author: userinfo.name,
        published: true,
      };
      try {
        const createdPost = await createPost([updatedValues]);
        navigate("/blogs");
        setLoading(false);
        handleReset();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
  });

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="z-51 absolute top-0 left-0 min-h-screen primary-color dark:bg-black  pt-7 w-full">
      <Link
        to="/"
        className="absolute top-2 left-2 dark:text-white hover:text-gray-900 hover:dark:text-gray-900 text-black text-xl md:text-lg"
      >
        <div className="rounded-full border-2 border-black dark:bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </div>
      </Link>
      <h1 className="text-center montserrat uppercase text-xl text-black dark:text-gray-400 pt-2 mb-5">
        Publish your blog here
      </h1>
      <form className="w-2/3 mx-auto bg-transparent" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-200 peer"
            placeholder=" "
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          {errors.title && touched.title ? (
            <p className="text-red-500 opacity-80 mt-1 text-sm">
              {errors.title}
            </p>
          ) : null}
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-200 peer-focus:dark:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="tags"
            id="tags"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-200 peer"
            placeholder=" "
            value={values.tags}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          {errors.tags && touched.tags ? (
            <p className="text-red-500 opacity-80 mt-1 text-sm">
              {errors.tags}
            </p>
          ) : null}

          <label
            htmlFor="tags"
            className="peer-focus:font-medium absolute text-sm text-black duration-300 dark:text-gray-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-200 peer-focus:dark:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tags
          </label>
        </div>
        <label
          htmlFor="content"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
        >
          Your Content
        </label>
        <textarea
          name="content"
          id="content"
          rows="8"
          className="block p-2.5 w-full text-sm text-gray-900 bg-transparent dark:bg-gray-900 dark:text-white rounded-lg border border-gray-900 resize-none"
          placeholder="Wrtie creatively "
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        ></textarea>

        {errors.content && touched.content ? (
          <p className="text-red-500 opacity-80 mt-1 text-sm">
            {errors.content}
          </p>
        ) : null}

        <button
          type="submit"
          className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          type="reset"
          className="hover:text-blue-500 text-gray-900 dark:text-gray-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
};
