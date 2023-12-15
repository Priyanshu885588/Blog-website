import React from "react";
import { useFormik } from "formik";
import { formSchema } from "./schemas";
import { createPost } from "../services/Api";
import { useNavigate } from "react-router-dom";
export const BlogPostForm = () => {
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
      const tagsArray = values.tags.split(" ");
      values.tags = tagsArray;
      const updatedValues = {
        ...values,
        published: true,
      };
      console.log([updatedValues]);
      try {
        const createdPost = await createPost([updatedValues]);
        navigate('/blogs');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    },
  });

  return (
    <>
      <h1 className="text-center montserrat uppercase text-xl mb-8 text-black dark:text-gray-400 mt-4">
        Publish your blog here
      </h1>
      <form className="w-2/3 mx-auto" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          {errors.title && touched.title ? (
            <p className="text-red-400 opacity-80 mt-1 text-sm">
              {errors.title}
            </p>
          ) : null}
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="tags"
              id="tags"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={values.tags}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {errors.tags && touched.tags ? (
              <p className="text-red-400 opacity-80 mt-1 text-sm">
                {errors.tags}
              </p>
            ) : null}

            <label
              htmlFor="tags"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tags
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="author"
              id="author"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={values.author}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
            {errors.author && touched.author ? (
              <p className="text-red-400 opacity-80 mt-1 text-sm">
                {errors.author}
              </p>
            ) : null}

            <label
              htmlFor="author"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Author
            </label>
          </div>
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
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
          placeholder="Wrtie creatively "
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        ></textarea>

        {errors.content && touched.content ? (
          <p className="text-red-400 opacity-80 mt-1 text-sm">
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
          className="hover:text-white text-gray-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </>
  );
};
