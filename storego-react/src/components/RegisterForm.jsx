import { Link, useNavigate } from 'react-router-dom';
import Field from './Field';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useForm } from '../hooks/useForm';
import { REGIONES } from '../data/regiones';
import { LINKED_FIELDS, REGISTER_RULES } from '../utils/validators';

const INITIAL = {
  run: '', fechaNacimiento: '', nombre: '', apellidos: '',
  email: '', emailConfirm: '', password: '', passwordConfirm: '',
  telefono: '', tipoUsuario: '', region: '', comuna: '', direccion: ''
};

// Sirve para el registro de la tienda y para "Nuevo usuario" del administrador (que trae tipo de usuario).
export default function RegisterForm({ admin = false }) {
  const { users, registerUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const rules = admin ? REGISTER_RULES : { ...REGISTER_RULES, tipoUsuario: undefined };
  const form = useForm(INITIAL, Object.fromEntries(Object.entries(rules).filter(([, r]) => r)), LINKED_FIELDS);
  const { values, errors, handleChange, handleBlur } = form;

  const comunas = REGIONES.find(r => r.nombre === values.region)?.comunas ?? [];

  const common = name => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
    onBlur: handleBlur
  });

  const handleRegion = e => form.change('region', e.target.value, { comuna: '' });

  const handleSubmit = e => {
    e.preventDefault();
    if (form.validateAll()) {
      showToast('Revisa los campos marcados en rojo');
      return;
    }
    const email = values.email.trim().toLowerCase();
    const run = values.run.trim().toUpperCase();
    if (users.some(u => u.email === email)) {
      form.setError('email', 'Este correo ya está registrado');
      return;
    }
    if (users.some(u => u.run === run)) {
      form.setError('run', 'Este RUN ya está registrado');
      return;
    }
    registerUser({
      run,
      nombre: values.nombre.trim(),
      apellidos: values.apellidos.trim(),
      email,
      password: values.password,
      fechaNacimiento: values.fechaNacimiento,
      telefono: values.telefono.trim(),
      region: values.region,
      comuna: values.comuna,
      direccion: values.direccion.trim(),
      rol: admin ? values.tipoUsuario : 'cliente'
    });
    if (admin) {
      showToast('Usuario creado correctamente');
      form.reset();
    } else {
      showToast('Cuenta creada, ahora inicia sesión');
      setTimeout(() => navigate('/login'), 1200);
    }
  };

  return (
    <form className="auth-card wide" onSubmit={handleSubmit} noValidate>
      {!admin && (
        <div className="auth-brand">
          <img src="/img/logo_tienda_transparent.png" alt="Logo StoreGo" className="auth-logo" />
          <h1>Registro de usuario</h1>
          <p className="auth-sub">Crea tu cuenta para comprar en StoreGo.</p>
        </div>
      )}
      <div className="form-grid">
        <Field {...common('run')} label="RUN" type="text" autoComplete="off"
          hint="Sin puntos ni guion, de 7 a 9 caracteres. Ej: 111111111" />
        <Field {...common('fechaNacimiento')} label="Fecha de nacimiento (opcional)" type="date" />
        <Field {...common('nombre')} label="Nombre" type="text" autoComplete="given-name" />
        <Field {...common('apellidos')} label="Apellidos" type="text" autoComplete="family-name" />
        <Field {...common('email')} label="Correo" type="email" placeholder="correo@duoc.cl" autoComplete="email"
          hint="Solo @duoc.cl, @profesor.duoc.cl o @gmail.com" />
        <Field {...common('emailConfirm')} label="Confirmar correo" type="email" autoComplete="off" />
        <Field {...common('password')} label="Contraseña" type="password" autoComplete="new-password"
          hint="Entre 4 y 10 caracteres" />
        <Field {...common('passwordConfirm')} label="Confirmar contraseña" type="password" autoComplete="new-password" />
        <Field {...common('telefono')} label="Teléfono (opcional)" type="tel" placeholder="+56912345678" />
        {admin && (
          <Field {...common('tipoUsuario')} label="Tipo de usuario" full>
            <option value="">-- Seleccione el tipo --</option>
            <option value="admin">Administrador</option>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
          </Field>
        )}
        <Field {...common('region')} onChange={handleRegion} label="Región">
          <option value="">-- Seleccione la región --</option>
          {REGIONES.map(r => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
        </Field>
        <Field {...common('comuna')} label="Comuna" disabled={!values.region}>
          <option value="">-- Seleccione la comuna --</option>
          {comunas.map(c => <option key={c} value={c}>{c}</option>)}
        </Field>
        <Field {...common('direccion')} label="Dirección" type="text" autoComplete="street-address"
          hint="Máximo 300 caracteres" full />
      </div>
      <div className="auth-actions">
        <button type="submit" className="btn btn-primary">Registrar</button>
      </div>
      {!admin && <p className="auth-alt">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>}
    </form>
  );
}
