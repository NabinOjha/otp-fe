import { Navigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';
import { bgnLinearGradientClass } from '../../utils';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, error } = useAuth();

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center gap-6">
        {error || 'Something went wrong'}
        <Link
          to="/sign-in"
          type="submit"
          className={`w-full text-center font-bold ${bgnLinearGradientClass} bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-0 transition-colors`}
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
