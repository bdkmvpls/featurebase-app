import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingIndicator from '@/components/LoadingIndicator';

const PrivateRoute: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading)
    return (
      <div className="w-screen">
        <LoadingIndicator />
      </div>
    );

  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
