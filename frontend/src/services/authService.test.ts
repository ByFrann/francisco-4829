import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from './authService';

describe('Pruebas Unitarias: authService', () => {
  beforeEach(() => {
    // Limpieza de LocalStorage previa a cada prueba para aislar escenarios
    localStorage.clear();
  });

  it('Debe registrar un nuevo usuario con saldo inicial en $0', () => {
    const result = authService.register('Francisco', 'francisco@test.com', '1234');
    
    expect(result.success).toBe(true);
    
    const users = authService.getUsers();
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('francisco@test.com');
    expect(users[0].balance).toBe(0);
  });

  it('Debe rechazar el registro si el correo electrónico ya existe', () => {
    authService.register('Francisco', 'francisco@test.com', '1234');
    
    const duplicate = authService.register('Otro Nombre', 'francisco@test.com', '5678');
    
    expect(duplicate.success).toBe(false);
    expect(duplicate.message).toBe('El correo ya está registrado.');
  });

  it('Debe autenticar correctamente a un usuario registrado', () => {
    authService.register('Francisco', 'francisco@test.com', '1234');
    
    const loginResult = authService.login('francisco@test.com', '1234');
    
    expect(loginResult.success).toBe(true);
    expect(loginResult.user?.name).toBe('Francisco');
  });

  it('Debe actualizar el saldo del usuario correctamente tras una recarga exitosa', () => {
    authService.register('Francisco', 'francisco@test.com', '1234');
    
    const updatedUser = authService.updateBalance('francisco@test.com', 250);
    
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.balance).toBe(250);
    
    // Verificar que el cambio persistió en LocalStorage
    const currentUser = authService.getCurrentUser();
    expect(currentUser?.balance).toBe(250);
  });
});