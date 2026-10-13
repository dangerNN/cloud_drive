import { formatBytes } from '../../utils/formatters';

export default function FilesTab({ files, setFiles, toggleSaveFile, onOpenUploadModal, t }) {
  
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
    
    // Очищаем память после скачивания
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  };

  return (
    <section className="glass-panel p-3 p-md-4 flex-grow-1">
      <div className="d-flex tab-header-block justify-content-between align-items-md-center mb-4">
        <div>
          <h3 className="m-0 fw-bold">{t.files}</h3>
          <small className="subtext">Безопасное локальное хранилище без ограничений памяти</small>
        </div>
        <button onClick={onOpenUploadModal} className="btn-glow text-nowrap">{t.upload}</button>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle bg-transparent m-0">
          <thead>
            <tr className="subtext">
              <th>Название</th>
              <th>Размер</th>
              <th>Статус хранения</th>
              <th className="text-end col-actions">Действия</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.id}>
                <td className="text-nowrap">📦 <strong>{file.name}</strong></td>
                <td><span className="badge bg-secondary">{formatBytes(file.rawSize)}</span></td>
                <td className="text-nowrap">
                  {file.isSaved ? (
                    <span className="badge bg-success bg-opacity-75">{t.permanent}</span>
                  ) : (
                    <span className="badge bg-warning text-dark">{t.autoDeleteIn} {file.daysLeft} {t.days}</span>
                  )}
                </td>
                <td className="col-actions">
                  <div className="table-actions">
                    <button onClick={() => handleDownload(file)} className="btn btn-sm btn-outline-info text-nowrap" title="Скачать файл">
                      ⬇️ Скачать
                    </button>
                    <button onClick={() => toggleSaveFile(file.id)} className={`btn btn-sm text-nowrap ${file.isSaved ? 'btn-warning' : 'btn-outline-warning'}`}>
                      {file.isSaved ? '⭐ В сохранённых' : '☆ Сохранить'}
                    </button>
                    <button onClick={() => setFiles(files.filter(f => f.id !== file.id))} className="btn btn-sm btn-outline-danger text-nowrap">
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {files.length === 0 && (
              <tr><td colSpan="4" className="text-center subtext py-4">Список файлов пуст. Нажмите «Загрузить файл»</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}