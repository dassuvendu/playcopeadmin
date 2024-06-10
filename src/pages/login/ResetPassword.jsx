import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessages, forgetPassword } from '../../reducers/AuthSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const { message, error } = useSelector((state) => state.loginAuth);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    dispatch(forgetPassword(data));
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(message);
    } else {
      setSuccessMessage(message);
    }
    // Set a timeout to hide the error message after 3 seconds
    const timeoutId = setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
      //   dispatch(clearMessages());
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [message, error, dispatch]);

  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Forgot Password
              </h1>
              {errorMessage && (
                <div
                  className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 capitalize'
                  role='alert'
                >
                  <span className='font-medium'>Failed! </span> {errorMessage}
                </div>
              )}
              {successMessage && (
                <div
                  className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'
                  role='alert'
                >
                  <span className='font-medium'>Success! </span>{' '}
                  {successMessage}
                </div>
              )}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-4 md:space-y-6'
              >
                <div>
                  <label
                    htmlFor='old_password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Old Password
                  </label>
                  <input
                    type='password'
                    name='old_password'
                    id='old_password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    {...register('old_password', {
                      required: 'Password is required',
                    })}
                  />
                  {errors?.old_password?.message && (
                    <h6 className='text-danger'>
                      {errors.old_password.message}
                    </h6>
                  )}
                </div>
                <div>
                  <label
                    htmlFor='new_password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    New Password
                  </label>
                  <input
                    type='password'
                    name='new_password'
                    id='new_password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    {...register('new_password', {
                      required: 'Password is required',
                    })}
                  />
                  {errors?.new_password?.message && (
                    <h6 className='text-danger'>
                      {errors.new_password.message}
                    </h6>
                  )}
                </div>
                <div className='flex items-center justify-between'></div>
                <button
                  type='submit'
                  className='w-full text-white bg-[#2aa9e1] hover:bg-[#18191b] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
