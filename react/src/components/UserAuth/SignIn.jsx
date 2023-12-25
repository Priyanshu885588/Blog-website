import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { signInSchema } from "./Schemas";
import { SignUp } from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCrendentials } from "../../slices/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { Loading } from "../UI/Loading";

export const SignIn = () => {
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const toggleSignUp = () => {
    setSignUp((prevVisibility) => !prevVisibility);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,
      onSubmit: async (values) => {
        try {
          const res = await login({
            email: values.email,
            password: values.password,
          }).unwrap();
          const token = res.token;
          dispatch(setCrendentials({ ...res }));
          navigate("/");
        } catch (err) {
          toast.error("Invalid username and password");
        }
      },
    });

  if (signUp) {
    return <SignUp toggleSignUp={toggleSignUp} />;
  }

  return (
    <>
      <div className="h-screen absolute w-screen top-0 dark:bg-black bg-white pt-10 z-50 flex flex-col justify-center items-center gap-2">
        {isLoading && (
          <div className="absolute top-0 h-screen w-screen">
            <Loading />
          </div>
        )}
        <Toaster />
        <h1 className="text-black dark:text-gray-100 text-3xl montserrat">
          Sign In
        </h1>
        <form className="md:w-1/3 w-11/12" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
              id="password"
              name="password"
              type="password"
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
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        <p
          className="text-blue-700 cursor-pointer opacity-70 hover:underline z-10"
          onClick={toggleSignUp}
        >
          Don't have an account
        </p>
        <Link
          to="/"
          className="text-blue-700 opacity-50 hover:underline text-sm z-10"
        >
          Back to home
        </Link>
      </div>
    </>
  );
};
