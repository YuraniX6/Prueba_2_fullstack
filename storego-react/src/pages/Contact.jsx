import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { isAllowedEmail } from '../utils/validators';

const EMPTY = { nombre: '', email: '', mensaje: '' };

export default function Contact() {
  usePageTitle('Contacto');
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!isAllowedEmail(form.email.trim())) {
      showToast('Usa un correo @gmail.com, @duoc.cl o @profesor.duoc.cl');
      return;
    }
    showToast('Mensaje enviado, te responderemos pronto.');
    setForm(EMPTY);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-grid"></div>
        <div className="container hero-inner">
          <span className="eyebrow">CONTACTO</span>
          <h1>¿Tienes una <span className="grad-text">pregunta</span>?</h1>
          <p className="hero-copy">Escríbenos y te respondemos a la brevedad.</p>
        </div>
      </section>

      <section className="products">
        <div className="container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" required value={form.nombre} onChange={handleChange} />
            <input type="email" name="email" placeholder="Correo" required value={form.email} onChange={handleChange} />
            <textarea name="mensaje" placeholder="Mensaje" rows={5} required value={form.mensaje} onChange={handleChange} />
            <button type="submit" className="btn btn-primary">Enviar mensaje</button>
          </form>
        </div>
      </section>
    </>
  );
}
