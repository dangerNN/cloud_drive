import { useState } from 'react';

export default function AuthScreen({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email || 'user@nexus.io');
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center bg-transparent p-3">
      <div className="glass-panel p-5 text-center" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--accent-cyan), #4facfe)', borderRadius: '10px' }}></div>
          <h3 className="m-0 fw-bold" style={{ letterSpacing: '1px' }}>NEXUS<span style={{ color: 'var(--accent-cyan)' }}>.HUB</span></h3>
        </div>

        <h4 className="mb-4 text-white">{isRegister ? 'Создать аккаунт' : 'Вход в систему'}</h4>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            className="form-control" 
            placeholder="Пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="btn-glow mt-2">{isRegister ? 'Зарегистрироваться' : 'Войти'}</button>
        </form>

        <p className="mt-4 mb-0" style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
          {isRegister ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?'}
          <span className="ms-2" style={{ color: 'var(--accent-cyan)', cursor: 'pointer', fontWeight: '600' }} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Войти' : 'Создать'}
          </span>
        </p>
      </div>
    </div>
  );
}