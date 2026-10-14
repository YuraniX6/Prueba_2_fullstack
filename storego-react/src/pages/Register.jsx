import RegisterForm from '../components/RegisterForm';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Register() {
  usePageTitle('Registro');
  return (
    <section className="auth-section">
      <div className="container">
        <RegisterForm />
      </div>
    </section>
  );
}
