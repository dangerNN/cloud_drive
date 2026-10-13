import { useState } from 'react';
import { formatBytes } from '../../utils/formatters';

export default function PhotosTab({ photos, setPhotos, toggleSavePhoto, onOpenPhotoUploadModal, t }) {
  const [modalPhoto, setModalPhoto] = useState(null);

  const currentIndex = photos.findIndex(p => p.id === modalPhoto?.id);

  const handleNext = (e) => {
    e.stopPropagation();
    if (photos.length === 0) return;
    const nextIndex = (currentIndex + 1) % photos.length;
    setModalPhoto(photos[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (photos.length === 0) return;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setModalPhoto(photos[prevIndex]);
  };

  const handleDelete = (id, e) => {
    if (e) e.stopPropagation();
    if (confirm('Вы уверены, что хотите удалить это фото?')) {
      setPhotos(prev => prev.filter(p => p.id !== id));
      if (modalPhoto?.id === id) {
        setModalPhoto(null);
      }
    }
  };

  return (
    <section className="glass-panel p-3 p-md-4 flex-grow-1">
      <div className="d-flex tab-header-block justify-content-between align-items-md-center mb-4">
        <div>
          <h3 className="m-0 fw-bold">{t.photos}</h3>
          <small className="subtext">Фото сохраняются в IndexedDB</small>
        </div>
        <button onClick={onOpenPhotoUploadModal} className="btn-glow text-nowrap">{t.addPhoto}</button>
      </div>

      <div className="row g-4">
        {photos.map(photo => (
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
                <button 
                  onClick={() => setModalPhoto(photo)} 
                  className="btn btn-sm btn-dark bg-opacity-75 border-0 text-info"
                  title="Открыть во весь экран"
                >
                  🔍
                </button>
                <button 
                  onClick={() => toggleSavePhoto(photo.id)} 
                  className="btn btn-sm btn-dark bg-opacity-75 border-0 text-warning"
                  title="Сохранить"
                >
                  {photo.isSaved ? '⭐' : '☆'}
                </button>
                <button 
                  onClick={(e) => handleDelete(photo.id, e)} 
                  className="btn btn-sm btn-dark bg-opacity-75 border-0 text-danger"
                  title="Удалить фото"
                >
                  🗑️
                </button>
              </div>

              <div className="photo-card-bottom">
                <div className="fw-bold text-white text-truncate mb-1" title={photo.title}>{photo.title}</div>
                <div className="d-flex justify-content-between align-items-center">
                  {photo.isSaved ? (
                    <span className="badge bg-success">{t.permanent}</span>
                  ) : (
                    <span className="badge bg-warning text-dark">{t.autoDeleteIn} {photo.daysLeft} {t.days}</span>
                  )}
                  <small className="text-white-50">{formatBytes(photo.rawSize)}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
        {photos.length === 0 && (
          <div className="col-12 text-center subtext py-5">
            Галерея пуста. Нажмите «Добавить фото»
          </div>
        )}
      </div>

      {modalPhoto && (
        <div className="modal-backdrop-custom d-flex flex-column align-items-center justify-content-center p-3" onClick={() => setModalPhoto(null)}>
          <div className="position-relative text-center d-flex align-items-center justify-content-center" style={{ maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%' }} onClick={(e) => e.stopPropagation()}>
            
            {/* Кнопка Назад */}
            {photos.length > 1 && (
              <button 
                onClick={handlePrev} 
                className="position-absolute start-0 btn btn-dark bg-opacity-75 text-white fs-4 px-3 py-2 border-0 rounded-circle shadow"
                style={{ zIndex: 10, left: '10px' }}
              >
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
                <span className="text-truncate me-3"><strong>{modalPhoto.title}</strong> ({currentIndex + 1} из {photos.length})</span>
                <div className="d-flex gap-2">
                  <button onClick={(e) => handleDelete(modalPhoto.id, e)} className="btn btn-sm btn-outline-danger">Удалить</button>
                  <button onClick={() => setModalPhoto(null)} className="btn btn-sm btn-outline-light">Закрыть</button>
                </div>
              </div>
            </div>

            {/* Кнопка Вперед */}
            {photos.length > 1 && (
              <button 
                onClick={handleNext} 
                className="position-absolute end-0 btn btn-dark bg-opacity-75 text-white fs-4 px-3 py-2 border-0 rounded-circle shadow"
                style={{ zIndex: 10, right: '10px' }}
              >
                ❯
              </button>
            )}

          </div>
        </div>
      )}
    </section>
  );
}