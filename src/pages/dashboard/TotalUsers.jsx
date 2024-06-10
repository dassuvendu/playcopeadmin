const TotalUsers = ({ users }) => {
  return (
    <div className="bg-[#2aa9e1] p-6 rounded-lg shadow-md transform hover:scale-110">
      <h2 className="text-2xl font-medium mb-2">Total Users</h2>
      <p className="text-3xl font-bold">{users}</p>
    </div>
  );
};

export default TotalUsers;
