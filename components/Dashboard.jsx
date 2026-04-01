import { useMemo, useState } from "react";
import "../style/dashboard.css";

export function Dashboard({ transactions }) {
  const [viewMode, setViewMode] = useState("monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData = useMemo(() => {
    return transactions.filter((item) => {
      if (!item.date) return false;

      const itemDate = new Date(item.date);

      return (
        (!startDate || itemDate >= new Date(startDate)) &&
        (!endDate || itemDate <= new Date(endDate))
      );
    });
  }, [transactions, startDate, endDate]);

  const groupedData = useMemo(() => {
    const result = {};

    filteredData.forEach((item) => {
      const date = new Date(item.date);

      let key;

      if (viewMode === "yearly") {
        key = `${date.getFullYear()}`;
      } else if (viewMode === "monthly") {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      } else {
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      if (!result[key]) {
        result[key] = { income: 0, expense: 0 };
      }

      if (item.type === "income") {
        result[key].income += item.amount;
      } else {
        result[key].expense += item.amount;
      }
    });

    return result;
  }, [filteredData, viewMode]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const formatLabel = (key) => {
    const parts = key.split("-");

    if (viewMode === "yearly") {
      return parts[0];
    }

    if (viewMode === "monthly") {
      return new Date(parts[0], parts[1] - 1).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
      });
    }

    return new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString(
      "id-ID",
    );
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);

    // reset filter kalau bukan daily
    if (mode !== "daily") {
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>

      {/* FILTER */}
      <div className="filter-wrapper">
        <h3>Filter</h3>
        <div className="filter-by-date">
          <label>
            From:
            <input
              type="date"
              value={startDate}
              disabled={viewMode !== "daily"}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>

          <label style={{ marginLeft: "10px" }}>
            To:
            <input
              type="date"
              value={endDate}
              disabled={viewMode !== "daily"}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <div className="filter-DMY">
          <select
            value={viewMode}
            onChange={(e) => handleViewChange(e.target.value)}
          >
            <option value="yearly">Per Year</option>
            <option value="monthly">Per Month</option>
            <option value="daily">Per Day</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      {Object.keys(groupedData).length === 0 ? (
        <p>No data</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>
                {viewMode === "yearly"
                  ? "Tahun"
                  : viewMode === "monthly"
                    ? "Bulan"
                    : "Tanggal"}
              </th>
              <th>Income</th>
              <th>Expense</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(groupedData)
              .sort((a, b) => new Date(b[0]) - new Date(a[0]))
              .map(([key, data]) => (
                <tr key={key}>
                  <td>{formatLabel(key)}</td>

                  <td style={{ color: "green" }}>
                    +{formatRupiah(data.income)}
                  </td>

                  <td style={{ color: "red" }}>
                    -{formatRupiah(data.expense)}
                  </td>

                  <td>{formatRupiah(data.income - data.expense)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
