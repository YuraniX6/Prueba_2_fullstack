import { PRODUCTS } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';

export default function AdminDashboard() {
  usePageTitle('Panel');
  const { session, users } = useAuth();

  return (
    <>
      <h1>¡HOLA {session.nombre}!</h1>
      <span className="role-badge">{session.rol}</span>
      <div className="stat-grid">
        <div className="stat-card"><strong>{PRODUCTS.length}</strong><span>Productos en la tienda</span></div>
        <div className="stat-card"><strong>{users.length}</strong><span>Usuarios registrados</span></div>
      </div>
    </>
  );
}
