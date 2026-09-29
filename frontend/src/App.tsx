import { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { Dashboard} from './components/Dashboard';
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
  
  const handleOpenRecharge = () => {
    alert('Proximamente: Modal de pasarela de pago SnailPay')
  };

  return (
    <div>
      {!currentUser ? (
        <Auth onLogin={(user) => setCurrentUser(user)} />
      ) : (
        <Dashboard 
          user={currentUser}
          onLogout={handleLogout}
          onOpenRecharge={handleOpenRecharge}
        />
      )}
    </div>
  );
}

export default App;