import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'storego_users';
const SESSION_KEY = 'storego_session';

// Usuarios de prueba. En un sistema real las contraseñas NO se guardan en el navegador.
const DEFAULT_USERS = [
  { nombre: 'Administrador', apellidos: 'StoreGo', email: 'admin@duoc.cl', password: 'admin123', rol: 'admin' },
  { nombre: 'Vendedor', apellidos: 'StoreGo', email: 'vendedor@duoc.cl', password: 'vend123', rol: 'vendedor' }
];

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [storedUsers, setStoredUsers] = useState(() => readJSON(USERS_KEY, []));
  const [session, setSession] = useState(() => readJSON(SESSION_KEY, null));

  const users = [...DEFAULT_USERS, ...storedUsers];

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return null;
    const data = { email: user.email, nombre: user.nombre, rol: user.rol };
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    setSession(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  const registerUser = user => {
    const next = [...storedUsers, user];
    localStorage.setItem(USERS_KEY, JSON.stringify(next));
    setStoredUsers(next);
  };

  return (
    <AuthContext.Provider value={{ session, users, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
