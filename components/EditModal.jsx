import { useState } from "react";
import "../style/modal.css";
import { categories } from "../data/categories";

export function EditModal({ item, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...item });
  const [error, setError] = useState("");

  if (!item) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { category: "" }),
    }));

    setError("");
  };

  const handleSubmit = () => {
    // VALIDASI
    if (!/^[a-zA-Z\s]+$/.test(form.text)) {
      return setError("Description harus mengandung huruf!");
    }

    if (!/^\d+$/.test(form.amount)) {
      return setError("Amount hanya boleh angka!");
    }

    if (!form.category) {
      return setError("Pilih category dulu!");
    }

    // UPDATE DATA
    onUpdate({
      ...form,
      amount: Number(form.amount),
    });

    onClose(); // tutup modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Transaction</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          name="text"
          value={form.text}
          onChange={handleChange}
          placeholder="Description"
        />

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">-- Select Category --</option>

          {categories[form.type].map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
