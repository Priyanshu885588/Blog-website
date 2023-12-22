import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "./Schemas";

export const SignUp = ({ toggleSignUp }) => {
  const initialValues = {
    name:"",
    email: "",
    password: "",
    ConfirmPassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {},
    });
  return (
    <div className="h-screen absolute w-screen top-0 dark:bg-black bg-white z-50 flex flex-col justify-center items-center gap-2">
      <h1 className="text-black dark:text-gray-100 text-3xl montserrat">
        Sign Up
      </h1>
      <form className="md:w-1/3 w-11/12">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            
          />
          {errors.name && touched.name ? (
            <p className="text-red-400 opacity-80 mt-1 text-sm">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            

          />
          {errors.email && touched.email ? (
            <p className="text-red-400 opacity-80 mt-1 text-sm">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            

          />
          {errors.password && touched.password ? (
            <p className="text-red-400 opacity-80 mt-1 text-sm">
              {errors.password}
            </p>
          ) : null}
        </div>
        <div className="mb-5">
          <label
            htmlFor="ConfirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="ConfirmPassword"
            id="ConfirmPassword"
            name="ConfirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={values.ConfirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          {errors.ConfirmPassword && touched.ConfirmPassword ? (
            <p className="text-red-400 opacity-80 mt-1 text-sm">
              {errors.ConfirmPassword}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <p
        className="text-blue-700 cursor-pointer opacity-70 hover:underline "
        onClick={toggleSignUp}
      >
        Alerady have an account
      </p>
      <Link to="/" className="text-blue-700 hover:underline text-sm opacity-50">
        Back to home
      </Link>
    </div>
  );
};
