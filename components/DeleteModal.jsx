import '../style/modal.css'

export function DeleteModal({ item, onClose, onConfirm }) {
  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Hapus transaksi?</h3>
         <div style={{ display: "flex", gap: "10px", marginTop: "10px", justifyContent: "center" }}>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}