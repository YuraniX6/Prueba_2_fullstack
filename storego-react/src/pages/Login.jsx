import { Link, useNavigate } from 'react-router-dom';
import Field from '../components/Field';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useForm } from '../hooks/useForm';
import { usePageTitle } from '../hooks/usePageTitle';
import { LOGIN_RULES } from '../utils/validators';

export default function Login() {
  usePageTitle('Iniciar sesión');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    { email: '', password: '' },
    LOGIN_RULES
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (validateAll()) {
      showToast('Revisa los campos marcados en rojo');
      return;
    }
    const user = login(values.email.trim().toLowerCase(), values.password);
    if (!user) {
      showToast('Correo o contraseña incorrectos');
      return;
    }
    showToast(`Bienvenido, ${user.nombre}`);
    setTimeout(() => navigate(user.rol === 'cliente' ? '/' : '/admin'), 900);
  };

  const common = name => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
    onBlur: handleBlur
  });

  return (
    <section className="auth-section">
      <div className="container">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-brand">
            <img src="/img/logo_tienda_transparent.png" alt="Logo StoreGo" className="auth-logo" />
            <h1>Iniciar sesión</h1>
            <p className="auth-sub">Ingresa con tu correo y contraseña.</p>
          </div>
          <div className="form-grid">
            <Field {...common('email')} label="Correo" type="email" placeholder="correo@duoc.cl"
              autoComplete="email" hint="Solo @duoc.cl, @profesor.duoc.cl o @gmail.com" full />
            <Field {...common('password')} label="Contraseña" type="password"
              autoComplete="current-password" hint="Entre 4 y 10 caracteres" full />
          </div>
          <div className="auth-actions">
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
          </div>
          <p className="auth-alt">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
          <p className="demo-note">
            Cuentas de prueba: administrador <strong>admin@duoc.cl</strong> / <strong>admin123</strong> ·
            vendedor <strong>vendedor@duoc.cl</strong> / <strong>vend123</strong>
          </p>
        </form>
      </div>
    </section>
  );
}
