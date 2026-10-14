import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = session?.rol === 'admin';

  const handleLogout = e => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const sideClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <div className="admin-page">
      <aside className="admin-side">
        <Link to="/admin" className="logo"><span>Store</span>Go</Link>
        <NavLink to="/admin" end className={sideClass}>Dashboard</NavLink>
        <a href="#" className="disabled" aria-disabled="true">Productos (próximamente)</a>
        {isAdmin && <a href="#" className="disabled" aria-disabled="true">Usuarios (próximamente)</a>}
        {isAdmin && <NavLink to="/admin/usuario-nuevo" className={sideClass}>Nuevo usuario</NavLink>}
        <Link to="/">Ver tienda</Link>
        <div className="spacer"></div>
        <a href="#" onClick={handleLogout}>Cerrar sesión</a>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
