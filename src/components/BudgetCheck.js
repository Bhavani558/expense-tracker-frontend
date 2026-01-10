import React, { useState } from "react";

function BudgetCheck({ refreshKey }) {
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    if (!budget) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses/budget-check?budget=${budget}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error checking budget:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
     <h3 style={{ marginBottom: "15px" }}>Check Monthly Budget</h3>

      <input
        type="number"
        placeholder="Enter your budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <button onClick={handleCheck}>Check</button>

      {result && (
        <div
          style={{
            marginTop: "10px",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor:
              result.status === "LIMIT_EXCEEDED" ? "#fee2e2" : "#d1fae5",
            color: result.status === "LIMIT_EXCEEDED" ? "#b91c1c" : "#065f46",
            fontWeight: "bold",
          }}
        >
          <p>Budget: ₹{result.budget}</p>
          <p>Spent This Month: ₹{result.spent}</p>
          {result.status === "LIMIT_EXCEEDED" ? (
            <p>Limit Exceeded by ₹{result.overBy}</p>
          ) : (
            <p>Within Limit. Remaining: ₹{result.remaining}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BudgetCheck;
