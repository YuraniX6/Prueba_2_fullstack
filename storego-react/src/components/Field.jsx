// Campo de formulario con etiqueta, ayuda y mensaje de error.
// Si recibe `children`, se dibuja un <select> con esas opciones.
export default function Field({ name, label, hint, error, value, full, children, ...props }) {
  const status = error ? 'invalid' : value.trim() !== '' ? 'valid' : '';
  const Control = children ? 'select' : 'input';

  return (
    <div className={`form-field${full ? ' full' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <Control id={name} name={name} value={value} className={status} {...props}>
        {children}
      </Control>
      {hint && <small className="field-hint">{hint}</small>}
      <small className="field-error" id={`${name}-error`}>{error}</small>
    </div>
  );
}
