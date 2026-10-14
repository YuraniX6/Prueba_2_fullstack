import { useState } from 'react';

const isPassword = name => name.toLowerCase().startsWith('password');

/**
 * Formulario controlado con validación en tiempo real:
 * mientras se escribe (si el campo ya fue tocado o tiene texto), al salir del campo y al enviar.
 */
export function useForm(initialValues, rules, linked = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const runRule = (name, vals) => {
    const rule = rules[name];
    if (!rule) return '';
    const raw = vals[name] ?? '';
    return rule(isPassword(name) ? raw : raw.trim(), vals);
  };

  // Cambia el valor de un campo (y opcionalmente otros, p. ej. limpiar comuna al cambiar región).
  const change = (name, value, extra = {}) => {
    const next = { ...values, [name]: value, ...extra };
    setValues(next);
    setErrors(prev => {
      const updated = { ...prev };
      Object.keys(extra).forEach(k => { updated[k] = ''; });
      if (touched[name] || value !== '') updated[name] = runRule(name, next);
      const linkedName = linked[name];
      if (linkedName && next[linkedName] !== '') updated[linkedName] = runRule(linkedName, next);
      return updated;
    });
  };

  const handleChange = e => change(e.target.name, e.target.value);

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: runRule(name, values) }));
  };

  // Valida todos los campos; devuelve el nombre del primero inválido (o null).
  const validateAll = () => {
    const nextErrors = {};
    const nextTouched = {};
    let firstInvalid = null;
    Object.keys(rules).forEach(name => {
      if (!(name in values)) return;
      nextTouched[name] = true;
      nextErrors[name] = runRule(name, values);
      if (nextErrors[name] && !firstInvalid) firstInvalid = name;
    });
    setTouched(nextTouched);
    setErrors(nextErrors);
    if (firstInvalid) document.getElementById(firstInvalid)?.focus();
    return firstInvalid;
  };

  const setError = (name, message) => {
    setErrors(prev => ({ ...prev, [name]: message }));
    document.getElementById(name)?.focus();
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return { values, errors, change, handleChange, handleBlur, validateAll, setError, reset };
}
