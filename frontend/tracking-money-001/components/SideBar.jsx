import { NavLink } from "react-router-dom";
import "../style/sidebar.css";

export function SideBar({ isOpen, setIsOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <h2>{isOpen ? "Money Tracker" : "💸"}</h2>

      <div className="nav-item">
        <NavLink to="/" end>
          {isOpen ? "Add Transaction" : "➕"}
        </NavLink>
        {!isOpen && <span className="tooltip">Add Transaction</span>}
      </div>

      <div className="nav-item">
        <NavLink to="/transactions">
          {isOpen ? "Transaction List" : "📄"}
        </NavLink>
        {!isOpen && <span className="tooltip">Transaction List</span>}
      </div>

      <div className="nav-item">
        <NavLink to="/dashboard">{isOpen ? "Dashboard" : "📊"}</NavLink>
        {!isOpen && <span className="tooltip">Dashboard</span>}
      </div>
    </div>
  );
}
