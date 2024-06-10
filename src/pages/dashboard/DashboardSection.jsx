import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalSubscriber } from "../../reducers/DashboardSlice";
import { useNavigate } from "react-router-dom";

const TotalUsers = lazy(() => import("./TotalUsers"));
const TotalSubscribers = lazy(() => import("./TotalSubscribers"));

const DashboardSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {subscriberCount, userCount} = useSelector((state) => state.subscriber);
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    dispatch(fetchTotalSubscriber());
  }, [dispatch]);
  useEffect(()=>{
    if(token == null ){
        navigate("/");
    }
  },[token]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8 transition-all duration-300">
      <Suspense fallback={<div>Loading...</div>}>
        <TotalUsers users={userCount} />
        <TotalSubscribers subscriptions={subscriberCount} />
      </Suspense>
    </div>
  );
};

export default DashboardSection;
