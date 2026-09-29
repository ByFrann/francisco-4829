import type { User } from '../types';

const USERS_KEY = 'sisu_users';
const SESSION_KEY = 'sisu_active_session';

export const authService = {
  // Obtiene todos los usuarios registrados
  getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  // Registra un nuevo usuario
  register(name: string, email: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    
    // Validación: Verificar si el correo ya existe
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'El correo ya está registrado.' };
    }

    const newUser: User = { name, email, password, balance: 0 };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { success: true, message: 'Registro exitoso. Ahora puedes iniciar sesión.' };
  },

  // Inicia sesión
  login(email: string, password: string): { success: boolean; user?: User; message?: string } {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Correo o contraseña incorrectos.' };
    }

    // Guardar la sesión activa (sin la contraseña por seguridad básica)
    const sessionUser = { name: user.name, email: user.email, balance: user.balance };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    
    return { success: true, user: sessionUser };
  },

  // Obtiene la sesión actual al recargar la página
  getCurrentUser(): User | null {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  // Actualiza el saldo del usuario
  updateBalance(email: string, amountToAdd: number): User | null {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex !== -1) {
      users[userIndex].balance += amountToAdd;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Actualizar también la sesión activa
      const sessionUser = { 
        name: users[userIndex].name, 
        email: users[userIndex].email, 
        balance: users[userIndex].balance 
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      
      return sessionUser;
    }
    return null;
  },

  // Cierra sesión
  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  }
};