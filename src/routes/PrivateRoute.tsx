import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return session ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
