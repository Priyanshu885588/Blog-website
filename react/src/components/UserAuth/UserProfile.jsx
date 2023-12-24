import React from "react";
import { useFormik } from "formik";
import { signUpSchema } from "./Schemas";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { setCrendentials } from "../../slices/authSlice";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { Loading } from "../UI/Loading";
export const UserProfile = ({ toggleSignUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setisEditing] = useState(false);
  const [token, setToken] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  useEffect(() => {
    // Access localStorage here
    const to = localStorage.getItem("userInfo");
    const userObject = JSON.parse(to);
    const tokenValue = userObject.token;
    setToken(tokenValue)
  }, []);
  useEffect(() => {
    values.name = userInfo.name;
    values.email = userInfo.email;
  }, [userInfo.email, userInfo.name]);

  const handleEditing = () => {
    setisEditing((prev) => !prev);
  };

  const initialValues = {
    name: userInfo.name,
    email: userInfo.email,
    password: "",
    ConfirmPassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        try {
          console.log(token);
          const res = await updateProfile({
            _id: userInfo._id,
            name: values.name,
            email: values.email,
            password: values.password,
            token:token
          }).unwrap();
          dispatch(setCrendentials(res));
          toast.success("Profile updated");
          setisEditing(false);
        } catch (error) {
          toast.error(error.data.message || error);
        }
      },
    });
  return (
    <div className="h-screen absolute w-screen top-0 dark:bg-black bg-white z-50 flex flex-col justify-center items-center gap-2">
      {isLoading && (
        <div className="absolute top-0 h-screen w-screen">
          <Loading />
        </div>
      )}
      <Toaster />
      <h1 className="text-black dark:text-gray-100 text-3xl montserrat">
        PROFILE
      </h1>
      <div className="flex flex-col justify-center items-center">
        <img
          className=""
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE3klEQVR4nO2a24vVVRTHP+OoM17IGZ0ms9LulJfpgn9CkQpTGr2UBUGUPdVMPfQQpBARZi/VUPRST5HUS2Z3JEaILK28PNSkU1FeKKx5CJpRx/HEgu+GxZk5v9/e+5wzSfiFwznwW9+192/vtdZea+0DF/D/RQdwJ/ACsBP4ATgJjOljv78H3pdML7CA8wRtwEbgE+AsUEn8GOdj4D7pmna0A08Ax92kTgGDwGZgA7ACWCTZdv1eCdwtmd3Aacc/BvRJdlqwFhh2E/gW2AR0ZujqFPc7p+8IcAdNhK3Uq25AG3xNg3S3aIEOOP2vNMPcLgG+0QCjwONAa6MHAWYC/QoONtZeoLtRyq/UdpviIWBVifx1wDPALuCEfOcfRbGXgGURY94EHNaYhzWHuncivMRXctgie38TmCiJVH8DDwAXlYzdBXztXqa7Hp8I5rQHmF8ge6lWPEz0Ddn8DcBcfSxiPe/C9Jh2yJ7Vwnz3MntzfeY1Z06LShx10EWwpSV6H9S5c0acL0om2OXMbCD1JdY5xy7zibske7LkhauxUmeHcZ8qkb3ZBYDo0DwH+EmkxyLk35KsHZCp6BX31wjZfucvUSb2pDsnYkLsX5K/hnS0aCeNvyQiNB+UrIX/Ugc/nrCF85yD5+Jz6bg9weSPle3K/RK0aBWDKyR/lHzslA4zs5gdDOnMvUWCn0no4chJdLsVykUYMzbdeVTyHxUdaGd1ElttEYNWHYBntFo5COdPT6T8QmXN47XqmfVSaDabgt/Eu4x0zNMinFa0jMXuInN8UQ8tT0rBe+LZeZKK28T9MpG3RTyrNCfhg8wJPSeefafiWXEtVUnBBvGsbJ6EkAbcmKBwhiuyniYdYWWHpSsWK1z6NAl/6mFKmrFEnBHyMSIdlnjGosulRZMQ6ufZCQpnKx+bSIh01ZFyQjpmJfDaXJ+gIS+CuiAV+djqBN5q55c1z4ScFwmmZXE6BbcAf4i7NYG3VZzfpSMFhaYVnN2KoVTcKq41D2IREsDUlzAsL3L23PCLIs5R8a0yLMNal77nZATrxbc8rWEHYkCf+D+XOH6HZCri5GBz0YGYm6IEzHL19ZRbLgy5GjwlUnkMFqUoOUljrbTeQmothC6LyeZgYVnS6FPqRzIHmSv+uQKZc5Ip6p4UYVNMyA6FlRUvOVjgWj21cEoyOVcKLa6wsg5+Yal7IrHQ8bhWXDuTaiGcVyabinWxpa5vPhxQwR+Ly9WNrCi1r4UdrulnnFjMBA7FNh+q20Ex4XGVGmejLvwWOfJSF35Hxe1pRjvIb+FYjUG6tSr7XE/XotH2yBTHZN6u6hPv12QX12hqJzfoqlumPyq3CR2/7Qp9YQIjWlWrEVJhnJddb6yiI+BdpT1o7CO5LdOpmtgDbgXHVZ3d06DLmDZdye1wizShi6U99TaxDRdrR7z5vANcT/OwDHi9ateHdcVRF652zv9LQtumHvS4gGAvcVWjFC/WlUFFt0/9Tbp6a1UzfNSZU907MZXPhAAQTv9G3r5aar/f6R9o9t37VNfTD2Ummh3iVl9Pr2GaMEcmENKZijqGu9Ti6VVbqVNF1wz9Xq5nWyQbbq0qugXom84/DHi0K9H8tM6/cGz8r/7CUctMrEzeBnyoAmpEYXRcv4f0bJtkc+ueC+B8x78fHcKd4U6+1gAAAABJRU5ErkJggg=="
        />
      </div>

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
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!isEditing}
          />
          {errors.email && touched.email ? (
            <p className="text-red-400 opacity-80 mt-1 text-sm">
              {errors.email}
            </p>
          ) : null}
        </div>
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
            disabled={!isEditing}
          />
          {errors.name && touched.name ? (
            <p className="text-red-400 opacity-80 mt-1 text-sm">
              {errors.name}
            </p>
          ) : null}
        </div>
        {isEditing && (
          <div className="flex flex-wrap justify-between">
            <div className="mb-5 w-1/2">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
              {errors.password && touched.password ? (
                <p className="text-red-400 opacity-80 mt-1 text-sm">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div className="mb-5 w-1/2">
              <label
                htmlFor="ConfirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={values.ConfirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
              {errors.ConfirmPassword && touched.ConfirmPassword ? (
                <p className="text-red-400 opacity-80 mt-1 text-sm">
                  {errors.ConfirmPassword}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 w-80 basis-full focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </div>
        )}
      </form>
      <button onClick={handleEditing}>
        {!isEditing ? "Update Your Details" : "Exit edit mode"}
      </button>
      <Link to="/" className="text-blue-700 hover:underline text-sm opacity-50">
        Back to home
      </Link>
    </div>
  );
};
