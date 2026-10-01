import { useState } from 'react';

export default function VaultTab({ isVaultUnlocked, setIsVaultUnlocked, t }) {
  const [pin, setPin] = useState('');

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsVaultUnlocked(true);
    } else {
      alert('Неверный PIN!');
    }
  };

  return (
    <section className="glass-panel p-4 flex-grow-1 text-center d-flex flex-column align-items-center justify-content-center">
      {!isVaultUnlocked ? (
        <form onSubmit={handleUnlock} style={{ maxWidth: '320px', width: '100%' }}>
          <div style={{ fontSize: '4rem' }}>🔐</div>
          <h3 className="fw-bold mt-2">{t.vaultTitle}</h3>
          <p className="subtext mb-3">{t.vaultEnterPin}</p>
          <input 
            type="password" 
            maxLength="4" 
            className="form-control text-center fs-4 tracking-widest mb-3" 
            placeholder="••••" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)} 
          />
          <button type="submit" className="btn-glow w-100">{t.unlock}</button>
        </form>
      ) : (
        <div>
          <div style={{ fontSize: '4rem' }}>🔓</div>
          <h3 className="fw-bold text-success mt-2">Сейф Разблокирован</h3>
          <button onClick={() => setIsVaultUnlocked(false)} className="btn btn-outline-light mt-3 btn-sm">Заблокировать</button>
        </div>
      )}
    </section>
  );
}