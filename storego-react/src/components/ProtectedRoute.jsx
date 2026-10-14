import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protege las páginas del administrador según el rol.
export default function ProtectedRoute({ roles, children }) {
  const { session } = useAuth();
  if (!session || !roles.includes(session.rol)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
