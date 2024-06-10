import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  // set timer for spinner
  const [count, setCount] = useState(2);
  const navigate = useNavigate();

  const isTokenPresent = localStorage.getItem("userToken");
  useEffect(() => {
    // prevent the user from logging in when they are already logged in
    if (isTokenPresent) {
      navigate("/dashboard");
    }

    // set interval
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 && navigate("/");

    // clear interval
    return () => clearInterval(interval);
  }, [count, navigate, isTokenPresent]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center">Redirecting to you in {count} seconds</h1>
        <div className="spinner-border mt-4" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
