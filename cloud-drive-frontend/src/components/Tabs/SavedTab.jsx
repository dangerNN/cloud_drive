export default function SavedTab({ savedFiles, savedPhotos, toggleSaveFile, toggleSavePhoto, t }) {
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
                <td><span className="badge bg-secondary">{file.size}</span></td>
                <td><span className="badge bg-success">{t.permanent}</span></td>
                <td className="col-actions text-end">
                  <button onClick={() => toggleSaveFile(file.id)} className="btn btn-sm btn-outline-warning text-nowrap">
                    Убрать из сохранённых
                  </button>
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
              <img src={photo.url} alt={photo.title} className="photo-card-img" />
              <div className="photo-card-bottom">
                <div className="fw-bold text-white mb-1">{photo.title}</div>
                <button onClick={() => toggleSavePhoto(photo.id)} className="btn btn-sm btn-outline-warning w-100 mt-2">
                  Убрать из сохранённых
                </button>
              </div>
            </div>
          </div>
        ))}
        {savedPhotos.length === 0 && <div className="subtext text-center py-3">Нет сохранённых фото</div>}
      </div>
    </section>
  );
}