import RegisterForm from '../components/RegisterForm';
import { usePageTitle } from '../hooks/usePageTitle';

export default function AdminNewUser() {
  usePageTitle('Nuevo usuario');
  return (
    <>
      <h1>Nuevo usuario</h1>
      <RegisterForm admin />
    </>
  );
}
