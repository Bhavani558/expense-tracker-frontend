import './App.css';
import ExpenseSummary from './components/ExpenseSummary';
import Myexpenses from './components/Myexpense';
import AddExpense from './components/AddExpense';
import BudgetCheck from './components/BudgetCheck';
import CategoryChart from './components/CategoryChart';

import { useState } from "react";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const refreshData = () => setRefreshKey(prev => prev + 1);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Expense Tracker
      </h1>

      {/* Add Expense + Budget Check */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            flex: "1 1 300px",
            backgroundColor: "#f9fafb",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <AddExpense
            refreshData={refreshData}
            expenseToEdit={expenseToEdit}
            setExpenseToEdit={setExpenseToEdit}
          />
        </div>

        <div
          style={{
            flex: "1 1 300px",
            backgroundColor: "#f9fafb",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <BudgetCheck refreshKey={refreshKey} />
        </div>
      </div>

      {/* Expense Summary */}
      <div style={{ marginBottom: "30px" }}>
        <ExpenseSummary refreshKey={refreshKey} />
      </div>

      {/* Expense List */}
      <Myexpenses
        refreshKey={refreshKey}
        setExpenseToEdit={setExpenseToEdit}
        refreshData={refreshData}
      />
      {/* Category Chart */}
      <CategoryChart />

    </div>
  );
}

export default App;
