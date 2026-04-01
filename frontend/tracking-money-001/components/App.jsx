import { useEffect, useState } from "react";
import { TransactionList } from "./TransactionList";
import { AddTransactionForm } from "./AddTransactionForm";
import { SideBar } from "./SideBar";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";

import "../style/app.css";

export function App() {
  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem("expense");
    return data ? JSON.parse(data) : [];
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(transactions));
  }, [transactions]);

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdate = (updatedItem) => {
    setTransactions((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  return (
    <div className="app-layout">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`content ${isOpen ? "shift" : "full"}`}>
        <Routes>
          <Route
            path="/"
            element={<AddTransactionForm setTransactions={setTransactions} />}
          />
          <Route
            path="/transactions"
            element={
              <TransactionList
                transactions={transactions}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard transactions={transactions} />}
          />
        </Routes>
      </div>
    </div>
  );
}
