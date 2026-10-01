import { useState } from 'react';

export default function UploadModal({ onClose, onUpload, accept = "*", title = "Загрузка файла" }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
      <div className="glass-panel p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h4 className="fw-bold mb-3">{title}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label subtext">Выберите файл с устройства:</label>
            <input 
              type="file" 
              accept={accept}
              className="form-control" 
              onChange={(e) => setSelectedFile(e.target.files[0] || null)} 
              required 
            />
          </div>

          {selectedFile && (
            <div className="p-3 mb-3 rounded bg-dark border border-secondary text-start small">
              <div className="text-white text-truncate"><strong>Имя:</strong> {selectedFile.name}</div>
              <div className="text-white-50"><strong>Размер:</strong> {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</div>
              <div className="text-white-50"><strong>Тип:</strong> {selectedFile.type || 'Файл'}</div>
            </div>
          )}

          <div className="d-flex justify-content-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-outline-secondary">Отмена</button>
            <button type="submit" className="btn-glow" disabled={!selectedFile}>Загрузить</button>
          </div>
        </form>
      </div>
    </div>
  );
}