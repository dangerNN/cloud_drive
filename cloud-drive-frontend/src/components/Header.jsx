export default function Header({ searchQuery, setSearchQuery, t, user, onLogout }) {
  return (
    <header className="glass-panel p-3 mb-4 d-flex app-header justify-content-between align-items-center">
      <input 
        type="text" 
        className="form-control custom-search" 
        placeholder={t.search} 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ maxWidth: '400px', borderRadius: '10px' }} 
      />
      
      <div className="d-flex align-items-center gap-3 header-right">
        <span className="badge status-badge-online px-3 py-2 text-nowrap" style={{ borderRadius: '20px' }}>{t.desktopOnline}</span>
        <button onClick={onLogout} className="btn btn-sm btn-outline-danger text-nowrap" style={{ borderRadius: '10px' }}>{t.logout}</button>
        <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width: '40px', height: '40px' }}>
          {user.email.substring(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
}