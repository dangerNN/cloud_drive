export default function SettingsTab({ lang, setLang, accentColor, setAccentColor, t }) {
  return (
    <section className="glass-panel p-4 flex-grow-1" style={{ maxWidth: '600px' }}>
      <h3 className="fw-bold mb-4">⚙️ {t.settings}</h3>

      <div className="mb-4">
        <label className="form-label fw-bold">{t.language}</label>
        <div className="d-flex gap-2">
          <button onClick={() => setLang('ru')} className={`btn ${lang === 'ru' ? 'btn-info' : 'btn-outline-secondary'}`}>🇷🇺 Русский</button>
          <button onClick={() => setLang('ua')} className={`btn ${lang === 'ua' ? 'btn-info' : 'btn-outline-secondary'}`}>🇺🇦 Українська</button>
          <button onClick={() => setLang('en')} className={`btn ${lang === 'en' ? 'btn-info' : 'btn-outline-secondary'}`}>🇬🇧 English</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">{t.accentColor}</label>
        <div className="d-flex gap-3">
          <div 
            onClick={() => setAccentColor('#00f2fe')} 
            style={{ width: '40px', height: '40px', background: '#00f2fe', borderRadius: '50%', cursor: 'pointer', border: accentColor === '#00f2fe' ? '3px solid white' : 'none' }}
          />
          <div 
            onClick={() => setAccentColor('#a855f7')} 
            style={{ width: '40px', height: '40px', background: '#a855f7', borderRadius: '50%', cursor: 'pointer', border: accentColor === '#a855f7' ? '3px solid white' : 'none' }}
          />
          <div 
            onClick={() => setAccentColor('#10b981')} 
            style={{ width: '40px', height: '40px', background: '#10b981', borderRadius: '50%', cursor: 'pointer', border: accentColor === '#10b981' ? '3px solid white' : 'none' }}
          />
        </div>
      </div>
    </section>
  );
}