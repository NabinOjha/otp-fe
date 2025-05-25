import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, error } = useAuth();

  if (loading) return <Loader />;

  if (!user || error) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
