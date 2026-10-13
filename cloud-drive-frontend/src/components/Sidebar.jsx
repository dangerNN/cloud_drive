import { formatBytes } from '../utils/formatters';

export default function Sidebar({ activeTab, setActiveTab, t, savedCount, onOpenTokenModal, accentColor, totalUsedBytes }) {
  const maxStorageBytes = 100 * 1024 * 1024 * 1024;
  const usedPercentage = Math.min(100, Math.max(0.5, (totalUsedBytes / maxStorageBytes) * 100)).toFixed(1);

  return (
    <aside className="glass-panel m-3 p-3 d-flex flex-column justify-content-between app-sidebar" style={{ width: '280px', flexShrink: 0 }}>
      <div>
        <div className="d-flex align-items-center gap-2 mb-4 px-2">
          <div style={{ width: '36px', height: '36px', background: `linear-gradient(135deg, ${accentColor}, #4facfe)`, borderRadius: '10px' }}></div>
          <h4 className="m-0 fw-bold" style={{ letterSpacing: '1px' }}>NEXUS<span style={{ color: 'var(--accent-cyan)' }}>.HUB</span></h4>
        </div>

        <nav className="d-flex flex-column gap-2 mb-3">
          <div className={`sidebar-link ${activeTab === 'files' ? 'active' : ''}`} onClick={() => setActiveTab('files')}>📁 <span>{t.files}</span></div>
          <div className={`sidebar-link ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>🖼️ <span>{t.photos}</span></div>
          <div className={`sidebar-link ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>⭐ <span>{t.saved} ({savedCount})</span></div>
          <div className={`sidebar-link ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>💬 <span>{t.notes}</span></div>
          <div className={`sidebar-link ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}>🔒 <span>{t.vault}</span></div>
          <div className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>⚙️ <span>{t.settings}</span></div>
        </nav>
      </div>

      <div>
        <button onClick={onOpenTokenModal} className="btn btn-outline-info w-100 mb-3 btn-sm text-nowrap" style={{ borderRadius: '10px' }}>
          {t.syncKey}
        </button>
        
        <div className="glass-panel p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="d-flex justify-content-between small subtext mb-2">
            <span>Занято: {formatBytes(totalUsedBytes)}</span>
            <span>100 GB</span>
          </div>
          <div className="progress" style={{ height: '6px', background: 'rgba(255,255,255,0.1)' }}>
            <div 
              className="progress-bar" 
              style={{ width: `${usedPercentage}%`, background: 'var(--accent-cyan)', transition: 'width 0.3s ease' }}
            ></div>
          </div>
        </div>
      </div>
    </aside>
  );
}