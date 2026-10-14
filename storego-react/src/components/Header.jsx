import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { session, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = e => {
    e.preventDefault();
    close();
    logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="scan-line"></div>
      <div className="container header-inner">
        <Link to="/" className="logo"><span>Store</span>Go</Link>
        <nav className={`nav${open ? ' open' : ''}`} id="mainNav">
          <NavLink to="/" end onClick={close}>Inicio</NavLink>
          <NavLink to="/productos" onClick={close}>Productos</NavLink>
          <NavLink to="/contacto" onClick={close}>Contacto</NavLink>
          {!session && (
            <>
              <Link to="/login" onClick={close}>Iniciar sesión</Link>
              <Link to="/registro" onClick={close}>Registrarse</Link>
            </>
          )}
          {session && session.rol !== 'cliente' && <Link to="/admin" onClick={close}>Panel</Link>}
          {session && <a href="#" onClick={handleLogout}>Salir ({session.nombre})</a>}
        </nav>
        <div className="header-actions">
          <Link to="/carrito" className="icon-btn" aria-label="Carrito">
            <img
              src={count > 0 ? '/img/carrito_ocupado.png' : '/img/carrito_vacio.png'}
              alt="Carrito"
              className="cart-icon-img"
            />
            <span className="cart-count">{count}</span>
          </Link>
          <button className="icon-btn" id="menuToggle" aria-label="Abrir menú" onClick={() => setOpen(o => !o)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
