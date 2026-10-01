export default function TokenModal({ onClose }) {
  return (
    <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
      <div className="glass-panel p-4 text-center" style={{ width: '100%', maxWidth: '480px' }}>
        <h4 className="fw-bold mb-2">Ключ Фонового Синхронизатора</h4>
        <div className="p-3 rounded-3 bg-dark text-info font-monospace my-3 border border-info">
          nx_live_2026_sync_key_99x
        </div>
        <button onClick={onClose} className="btn-glow w-100">Закрыть</button>
      </div>
    </div>
  );
}