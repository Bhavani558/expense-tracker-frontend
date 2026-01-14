import React, { useState,useEffect} from "react";
import { API_BASE_URL } from "../api";


function AddExpense({ refreshData, expenseToEdit, setExpenseToEdit }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  useEffect(() => {
  if (expenseToEdit) {
    setTitle(expenseToEdit.title);
    setAmount(expenseToEdit.amount);
    setCategory(expenseToEdit.category);
    setDate(expenseToEdit.date);
  }
}, [expenseToEdit]);


  const handleSubmit = async (e) => {
  e.preventDefault();

  const expenseData = {
    title,
    amount: Number(amount),
    category,
    date,
  };

  try {
    if (expenseToEdit) {
      // UPDATE (PUT)
      await fetch(
        `${API_BASE_URL}/api/expenses/${expenseToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        }
      );

      // exit edit mode
      setExpenseToEdit(null);
    } else {
      // ADD (POST)
      await fetch(`${API_BASE_URL}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });
    }

    // clear form
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");

    // refresh UI
    refreshData();
  } catch (error) {
    console.error("Error saving expense:", error);
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
     <h3 style={{ marginBottom: "15px" }}>Add Expense</h3>


      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit"> {expenseToEdit ? "Update Expense" : "Add Expense"}</button>
    </form>
  );
}

export default AddExpense;
