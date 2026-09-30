import React, { useState } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      // Flujo de Login
      const result = authService.login(email, password);
      if (result.success && result.user) {
        onLogin(result.user);
      } else {
        setError(result.message || 'Error al iniciar sesión');
      }
    } else {
      // Flujo de Registro
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }
      if (password.length < 4) {
        setError('La contraseña debe tener al menos 4 caracteres.');
        return;
      }

      const result = authService.register(name, email, password);
      if (result.success) {
        setSuccess(result.message);
        setIsLogin(true); // Cambiar a la vista de login tras registro exitoso
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Iniciar Sesión' : 'Registro'}</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {!isLogin && (
          <input type="text" placeholder="Nombre completo" required value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f0f2f4'}} />
        )}
        <input type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f0f2f4'}} />
        <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f0f2f4'}} />
        
        {!isLogin && (
          <input type="password" placeholder="Confirmar contraseña" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f0f2f4'}} />
        )}

        <button type="submit" style={{ padding: '10px', backgroundColor: '#556ee6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isLogin ? 'Ingresar' : 'Registrarse'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#556ee6' }} onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}>
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </p>
    </div>
  );
};