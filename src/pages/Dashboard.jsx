import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://sign-up-page-h05w.onrender.com/protected-endpoint", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.error("Error:", err);
        alert("Access denied");
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
