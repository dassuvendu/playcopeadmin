import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
const errorHandler = (errorsData) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let errors = {};
  console.log(errorsData);
  errors.message = 'Something went wrong. Please try again later.';
  let statusCode = errorsData?.response?.status
    ? errorsData.response.status
    : undefined;
  console.log(statusCode);
  if (statusCode) {
    switch (statusCode) {
      case 403:

        dispatch(logout());
        navigate("/");
        break;
      case 422:
        errors.message = errorsData?.response?.data?.errors
          ? errorsData.response.data.errors
          : 'Validation error';
        break;
      default:
        errors.message = errorsData?.response?.data?.error
          ? errorsData.response.data.error
          : 'Something went wrong. Please try again later';
        break;
    }
  } else if (errorsData.code === 'ERR_NETWORK') {
    errors.message = 'API server network error';
  }

  return errors;
};

export default errorHandler;
