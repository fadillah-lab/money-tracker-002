import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { categories } from "../data/categories";
import "../style/form.css";

export function AddTransactionForm({ setTransactions }) {
  const [error, setError] = useState("");

  const inputRef = useRef();
  const [form, setForm] = useState({
    text: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { category: "" }), // reset category kalau type berubah
    }));

    setError("");
  };

  //   const getToday = () => {
  //     return new Date().toISOString().split("T")[0];
  //   };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z\s]+$/.test(form.text)) {
      setError("Description hanya boleh berisi huruf & spasi!");
      return;
    }

    if (!/^\d+$/.test(form.amount) || Number(form.amount) <= 0) {
      return setError("Amount harus angka dan lebih dari 0!");
    }

    if (!form.category) return alert("Pilih category dulu!");

    const newTransaction = {
      id: Date.now(),
      text: form.text,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    };

    setTransactions((prev) => [...prev, newTransaction]);

    setForm({
      text: "",
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });
  };

  return (
    <div className="wrapper-transactionForm">
      <h1>Tracking Money</h1>

      <form onSubmit={onSubmit}>
        <Input
          ref={inputRef}
          type="text"
          name="text"
          value={form.text}
          onChange={handleChange}
        >
          Description :
        </Input>

        <Input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
        >
          Amount :
        </Input>
        <Input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        >
          Date :
        </Input>

        {/* TYPE dulu */}
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* CATEGORY dinamis */}
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">-- Select Category --</option>

          {categories[form.type].map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {error && <p style={{ color: "red", fontSize: "10px" }}>{error}</p>}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export const Input = forwardRef(
  ({ children, name, value, type, onChange }, ref) => {
    return (
      <label>
        {children}
        <input
          ref={ref}
          onChange={onChange}
          type={type}
          name={name}
          value={value}
          required
        />
      </label>
    );
  },
);
