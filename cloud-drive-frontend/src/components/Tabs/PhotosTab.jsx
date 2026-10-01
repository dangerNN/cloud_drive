import { formatBytes } from '../../utils/formatters';

export default function PhotosTab({ photos, setPhotos, toggleSavePhoto, onOpenPhotoUploadModal, t }) {
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
              <img src={photo.previewUrl} alt={photo.title} className="photo-card-img" />
              
              <div className="photo-card-overlay">
                <button onClick={() => toggleSavePhoto(photo.id)} className="btn btn-sm btn-dark bg-opacity-75 border-0 text-warning">
                  {photo.isSaved ? '⭐ Saved' : '☆ Save'}
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
    </section>
  );
} 