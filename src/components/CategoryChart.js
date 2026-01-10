import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function CategoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses/category-summary")
      .then((res) => res.json())
      .then((result) => {
        const chartData = Object.keys(result).map((key) => ({
          category: key,
          amount: result[key], // changed 'total' → 'amount'
        }));
        setData(chartData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ width: "100%", height: 300, marginTop: "30px" }}>
      <h3>Expenses by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;
