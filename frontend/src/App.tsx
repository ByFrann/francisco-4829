import { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { Dashboard} from './components/Dashboard';
import { SnailPayModal } from './components/SnailPayModal';
import { authService } from './services/authService';
import type { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  
  const handleOpenRechargeSuccess = (amount: number) => {
    if (currentUser) {
      const updatedUser = authService.updateBalance(currentUser.email, amount);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    }
    setIsModalOpen(false)
  };

  return (
    <div>
      {!currentUser ? (
        <Auth onLogin={(user) => setCurrentUser(user)} />
      ) : (
        <>
          <Dashboard 
            user={currentUser}
            onLogout={handleLogout}
            onOpenRecharge={() => setIsModalOpen(true)}
          />
          {isModalOpen && (
            <SnailPayModal
              user={currentUser}
              onClose={() => setIsModalOpen(false)}
              onSuccess = {handleOpenRechargeSuccess}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;