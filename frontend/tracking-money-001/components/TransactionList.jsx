import "../style/table.css";
import { useState } from "react";
import { EditModal } from "./EditModal";
import { DeleteModal } from "./DeleteModal";

export function TransactionList({ transactions, onDelete, onUpdate }) {
  const [selected, setSelected] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  if (transactions.length === 0) {
    return <p>No transactions yet</p>;
  }

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID");
  };

  const handleEdit = (item) => {
    setSelected(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item) => {
    setSelected(item);
    setIsDeleteOpen(true);
  };

  const filteredTransactions = transactions
    .filter((item) => {
      if (!startDate && !endDate) return true;

      const itemDate = new Date(item.date);

      return (
        (!startDate || itemDate >= new Date(startDate)) &&
        (!endDate || itemDate <= new Date(endDate))
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // terbaru dulu

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="transaction-list" style={{ textAlign: "center" }}>
      <h1>Transaction List</h1>

      <div className="container-wrapper-filter">
        <div className="wrapper-filter">
        <h3>Filter By Date</h3>
        <div className="filter-input">
          <label>
            From:
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </label>

          <label style={{ marginLeft: "10px" }}>
            To:
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </label>
        </div>
      </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="transaction-item">
              <td>{item.text}</td>
              <td>{item.category}</td>
              <td
                style={{
                  color: item.type === "income" ? "green" : "red",
                }}
              >
                {item.type === "income" ? "+" : "-"}
                {formatRupiah(item.amount)}
              </td>
              <td>{formatDate(item.date)}</td>
              <td>{item.type}</td>
              <td className="btn-action">
                <button onClick={() => handleEdit(item)}>✏️</button>
                <button onClick={() => handleDelete(item)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {isEditOpen && (
        <EditModal
          item={selected}
          onClose={() => setIsEditOpen(false)}
          onUpdate={onUpdate}
        />
      )}

      {isDeleteOpen && (
        <DeleteModal
          item={selected}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={() => {
            onDelete(selected.id);
            setIsDeleteOpen(false);
          }}
        />
      )}
    </div>
  );
}
