import { useState } from 'react';
import { formatBytes } from '../../utils/formatters';

export default function SavedTab({ savedFiles, savedPhotos, toggleSaveFile, toggleSavePhoto, setFiles, setPhotos, t }) {
  const [modalPhoto, setModalPhoto] = useState(null);

  const currentIndex = savedPhotos.findIndex(p => p.id === modalPhoto?.id);

  const handleNext = (e) => {
    e.stopPropagation();
    if (savedPhotos.length === 0) return;
    const nextIndex = (currentIndex + 1) % savedPhotos.length;
    setModalPhoto(savedPhotos[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (savedPhotos.length === 0) return;
    const prevIndex = (currentIndex - 1 + savedPhotos.length) % savedPhotos.length;
    setModalPhoto(savedPhotos[prevIndex]);
  };

  const handleDownload = (file) => {
    const downloadUrl = file.fileBlob ? URL.createObjectURL(file.fileBlob) : null;
    if (!downloadUrl) {
      alert('Ошибка: Файл поврежден или отсутствует.');
      return;
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  };

  const handleDeleteFile = (id) => {
    if (confirm('Удалить этот файл навсегда?')) {
      setFiles(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleDeletePhoto = (id, e) => {
    if (e) e.stopPropagation();
    if (confirm('Удалить это фото навсегда?')) {
      setPhotos(prev => prev.filter(p => p.id !== id));
      if (modalPhoto?.id === id) setModalPhoto(null);
    }
  };

  return (
    <section className="glass-panel p-3 p-md-4 flex-grow-1">
      <div className="mb-4">
        <h3 className="m-0 fw-bold">⭐ {t.saved}</h3>
        <small className="subtext">Файлы и фотографии из этого раздела НЕ будут удалены через 7 дней</small>
      </div>

      <h5 className="text-white mt-4 mb-3">Сохранённые Файлы ({savedFiles.length})</h5>
      <div className="table-responsive mb-4">
        <table className="table table-dark table-hover align-middle bg-transparent m-0">
          <tbody>
            {savedFiles.map(file => (
              <tr key={file.id}>
                <td className="text-nowrap">📦 <strong>{file.name}</strong></td>
                <td><span className="badge bg-secondary">{formatBytes(file.rawSize)}</span></td>
                <td><span className="badge bg-success">{t.permanent}</span></td>
                <td className="col-actions text-end">
                  <div className="table-actions">
                    <button onClick={() => handleDownload(file)} className="btn btn-sm btn-outline-info text-nowrap me-2" title="Скачать файл">
                      ⬇️ Скачать
                    </button>
                    <button onClick={() => toggleSaveFile(file.id)} className="btn btn-sm btn-outline-warning text-nowrap me-2">
                      Убрать из сохранённых
                    </button>
                    <button onClick={() => handleDeleteFile(file.id)} className="btn btn-sm btn-outline-danger text-nowrap">
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {savedFiles.length === 0 && <tr><td colSpan="4" className="subtext text-center py-3">Нет сохранённых файлов</td></tr>}
          </tbody>
        </table>
      </div>

      <h5 className="text-white mb-3">Сохранённые Фотографии ({savedPhotos.length})</h5>
      <div className="row g-4">
        {savedPhotos.map(photo => (
          <div key={photo.id} className="col-12 col-sm-6 col-md-4">
            <div className="photo-card-container glass-panel">
              <img 
                src={photo.previewUrl || photo.url} 
                alt={photo.title} 
                className="photo-card-img" 
                style={{ cursor: 'pointer' }}
                onClick={() => setModalPhoto(photo)}
              />
              
              <div className="photo-card-overlay d-flex gap-2">
                <button onClick={() => setModalPhoto(photo)} className="btn btn-sm btn-dark bg-opacity-75 border-0 text-info" title="Открыть во весь экран">
                  🔍
                </button>
                <button onClick={(e) => handleDeletePhoto(photo.id, e)} className="btn btn-sm btn-dark bg-opacity-75 border-0 text-danger" title="Удалить фото">
                  🗑️
                </button>
              </div>

              <div className="photo-card-bottom">
                <div className="fw-bold text-white text-truncate mb-1">{photo.title}</div>
                <div className="d-flex gap-2 mt-2">
                  <button onClick={() => toggleSavePhoto(photo.id)} className="btn btn-sm btn-outline-warning w-50 text-nowrap">
                    Убрать
                  </button>
                  <button onClick={(e) => handleDeletePhoto(photo.id, e)} className="btn btn-sm btn-outline-danger w-50 text-nowrap">
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {savedPhotos.length === 0 && <div className="col-12 subtext text-center py-3">Нет сохранённых фото</div>}
      </div>

      {/* Просмотрщик фото в «Сохраненном» с навигацией */}
      {modalPhoto && (
        <div className="modal-backdrop-custom d-flex flex-column align-items-center justify-content-center p-3" onClick={() => setModalPhoto(null)}>
          <div className="position-relative text-center d-flex align-items-center justify-content-center" style={{ maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%' }} onClick={(e) => e.stopPropagation()}>
            
            {savedPhotos.length > 1 && (
              <button onClick={handlePrev} className="position-absolute start-0 btn btn-dark bg-opacity-75 text-white fs-4 px-3 py-2 border-0 rounded-circle shadow" style={{ zIndex: 10, left: '10px' }}>
                ❮
              </button>
            )}

            <div className="d-flex flex-column align-items-center">
              <img 
                src={modalPhoto.previewUrl || modalPhoto.url} 
                alt={modalPhoto.title} 
                style={{ maxWidth: '80vw', maxHeight: '75vh', objectFit: 'contain', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }} 
              />
              <div className="mt-3 d-flex justify-content-between align-items-center text-white bg-dark bg-opacity-75 p-2 px-3 rounded-3" style={{ minWidth: '320px' }}>
                <span className="text-truncate me-3"><strong>{modalPhoto.title}</strong> ({currentIndex + 1} из {savedPhotos.length})</span>
                <div className="d-flex gap-2">
                  <button onClick={(e) => handleDeletePhoto(modalPhoto.id, e)} className="btn btn-sm btn-outline-danger">Удалить</button>
                  <button onClick={() => setModalPhoto(null)} className="btn btn-sm btn-outline-light">Закрыть</button>
                </div>
              </div>
            </div>

            {savedPhotos.length > 1 && (
              <button onClick={handleNext} className="position-absolute end-0 btn btn-dark bg-opacity-75 text-white fs-4 px-3 py-2 border-0 rounded-circle shadow" style={{ zIndex: 10, right: '10px' }}>
                ❯
              </button>
            )}

          </div>
        </div>
      )}
    </section>
  );
}