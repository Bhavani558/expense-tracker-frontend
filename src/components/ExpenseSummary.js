import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";


function ExpenseSummary({ refreshKey }) {
  const [summary, setSummary] = useState({ total: 0, today: 0, thisMonth: 0 });
  
    // This is where your fetch line goes
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/expenses/summary-expense`);
        const data = await response.json();
        console.log("SUMMARY API RESPONSE 👉", data); 
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };
    useEffect(() => {
    fetchSummary();  // Call the async function
  }, [refreshKey]); // Empty dependency array = run once when component mounts

  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Total Spent</h3>
        <p>₹{summary.total}</p>
      </div>
      <div className="card">
        <h3>Today</h3>
        <p>₹{summary.today}</p>
      </div>
      <div className="card">
        <h3>This Month</h3>
        <p>₹{summary.thisMonth}</p>
      </div>
    </div>
  );
}

export default ExpenseSummary;
