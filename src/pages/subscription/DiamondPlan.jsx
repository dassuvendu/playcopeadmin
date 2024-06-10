function DiamondPlan({ monthlyPlan }) {
  return (
    <div className="bg-[#2aa9e1] p-6 rounded-lg shadow-md transform hover:scale-110">
      <h2 className="text-2xl font-medium mb-2">Monthly Plan</h2>
      <p className="text-3xl font-bold">$ {monthlyPlan}</p>
    </div>
  );
}

export default DiamondPlan;
