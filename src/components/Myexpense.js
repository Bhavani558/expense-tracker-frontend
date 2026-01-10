import React, { useEffect, useState, useCallback } from "react";


function Myexpenses({ refreshKey, setExpenseToEdit }) {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const fetchExpenses = useCallback(async () => {
    try {
      const query = new URLSearchParams({
        category: selectedCategory,
        title: searchText || "",
      }).toString();

      const response = await fetch(
        `http://localhost:8080/api/expenses/filter?${query}`
      );
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }, [selectedCategory, searchText]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses,refreshKey]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "Food":
        return "#f97316";
      case "Transport":
        return "#2563eb";
      case "Shopping":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="expenses-list">
      <h2>My Expenses</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ maxWidth: "250px" }}
      />

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ maxWidth: "200px" }}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
      </select>

      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        expenses.map((exp) => (
          <div key={exp.id} className="expense-card">
            <strong>{exp.title}</strong> - ₹{exp.amount} |{" "}
            <span
              style={{
                backgroundColor: getCategoryColor(exp.category),
                color: "white",
                padding: "2px 6px",
                borderRadius: "6px",
              }}
            >
              {exp.category}
            </span>{" "}
            | {exp.date}
            <div style={{ marginTop: "5px", display: "flex", gap: "8px" }}>
  <button onClick={() => setExpenseToEdit(exp)}>
    Edit
  </button>

  <button
    onClick={async () => {
      await fetch(`http://localhost:8080/api/expenses/${exp.id}`, {
        method: "DELETE",
      });
      fetchExpenses();
    }}
    style={{ backgroundColor: "#dc2626", color: "white" }}
  >
    Delete
  </button>
</div>

          </div>
        ))
      )}
    </div>
  );
}

export default Myexpenses;

