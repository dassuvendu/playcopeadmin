const TotalSubscribers = ({ subscriptions }) => {
  return (
    <div className=" bg-[#18191b] p-6 rounded-lg shadow-md transform hover:scale-110">
      <h2 className="text-2xl font-medium mb-2">Total Subscribers</h2>
      <p className="text-3xl font-bold">{subscriptions}</p>
    </div>
  );
};

export default TotalSubscribers;
