import React from "react";
import { useFormik } from "formik";
import { formSchema } from "./schemas";
import { createPost } from "../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { selectUserInfo } from "../../slices/authSlice";
import { useSelector } from "react-redux";
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
      <div className="flex items-center flex-col gap-4 justify-center w-screen h-screen rounded-lg bg-transparent backdrop:blur-2xl z-50">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <div className="px-3 py-1 text-lg font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
          loading...
        </div>
      </div>
    );
  }

  return (
    <div className="z-51 absolute top-0 left-0 bg-transparent dark:bg-transparent backdrop-blur-3xl min-h-screen pt-7 w-full">
      <Link
        to="/"
        className="absolute top-2 left-2 dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-white text-xl md:text-lg"
      >
        ⇽ BACK
      </Link>
      <h1 className="text-center montserrat uppercase text-xl text-white dark:text-gray-400 pt-2">
        Publish your blog here
      </h1>
      <form className="w-2/3 mx-auto bg-transparent" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-200 focus:outline-none focus:ring-0 focus:border-blue-200 peer"
            placeholder=" "
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          {errors.title && touched.title ? (
            <p className="text-red-200 opacity-80 mt-1 text-sm">
              {errors.title}
            </p>
          ) : null}
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-200 peer-focus:dark:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            <p className="text-red-200 opacity-80 mt-1 text-sm">
              {errors.tags}
            </p>
          ) : null}

          <label
            htmlFor="tags"
            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-200 peer-focus:dark:text-blue-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 resize-none"
          placeholder="Wrtie creatively "
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        ></textarea>

        {errors.content && touched.content ? (
          <p className="text-red-200 opacity-80 mt-1 text-sm">
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
          className="hover:text-blue-500 text-gray-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
};
