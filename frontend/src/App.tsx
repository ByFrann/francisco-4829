import { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { authService } from './services/authService';
import type { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Al cargar la app, verificamos si hay una sesión activa en LocalStorage
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return (
    <div>
      {!currentUser ? (
        <Auth onLogin={(user) => setCurrentUser(user)} />
      ) : (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <h1>Dashboard</h1>
          <p>Bienvenido, <strong>{currentUser.name}</strong></p>
          <p>Saldo actual: <strong>${currentUser.balance}</strong></p>
          <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default App;