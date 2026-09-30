import React, { useState } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types';
import './Auth.css'; 

// Definición de las propiedades que el componente Auth recibirá
interface AuthProps {
  onLogin: (user: User) => void;
}

// Componente de autenticación que maneja tanto el registro como el inicio de sesión
export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Función para manejar el envío del formulario de autenticación
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

      // Intentar registrar al usuario
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
    // Renderizamos la interfaz de usuario según el estado de autenticación
    <div className='login-box' >
      <h2 className='login-title' >{isLogin ? 'Iniciar Sesión' : 'Registro'}</h2>
      
      {error && <div className='info-error'>{error}</div>}
      {success && <div className='info-success'>{success}</div>}

      <form className='login-form' onSubmit={handleSubmit} >
        {!isLogin && (
          <input className='login-input' type="text" placeholder="Nombre completo" required value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <input className='login-input' type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='login-input' type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
        
        {!isLogin && (
          <input className='login-input' type="password" placeholder="Confirmar contraseña" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        )}

        <button className='login-button' type="submit">
          {isLogin ? 'Ingresar' : 'Registrarse'}
        </button>
      </form>

      <p className='login-link' onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}>
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </p>
    </div>
  );
};