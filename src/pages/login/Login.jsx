import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Logo from "../../assets/images/logo.png";

import { login } from "../../reducers/AuthSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, error } = useSelector((state) => state.loginAuth);

  const isTokenPresent = localStorage.getItem("userToken");

  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    const payload = {
      ...data,
      uuid: uuidv4(),
    };
    // Dispatch the loginUser action with the form data
    dispatch(login(payload));
  };

  // redirect authenticated user to dashboard
  useEffect(() => {
    if (isTokenPresent) {
      navigate("/dashboard", { replace: true });
    } else if (error && message) {
      setErrorMessage(message);
      // Set a timeout to hide the error message after 3 seconds
      const timeoutId = setTimeout(() => {
        setErrorMessage(null);
      }, 2000);

      // Clear the timeout when the component unmounts or when errorMessage changes
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [navigate, isTokenPresent, message, error]);

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              src={Logo}
              className="inline-block w-32 h-32 transition-transform duration-1000 delay-500 transform sm:h-16 sm:w-16 md:w-[112px] md:h-[84px] rotate-360"
              alt="Flowbite Logo"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              {errorMessage && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Failed! </span> {errorMessage}
                </div>
              )}
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-4 md:space-y-6"
              >
                <div>
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors?.email?.message && (
                    <h6 className="text-danger">{errors.email.message}</h6>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors?.password?.message && (
                    <h6 className="text-danger">{errors.password.message}</h6>
                  )}
                </div>
                <div className="flex items-center justify-between"></div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#2aa9e1] hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
