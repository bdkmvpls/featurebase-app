import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayouts';
import NotFound from '../layouts/NotFound';
import PrivateRoute from '../routes/PrivateRoute';  
import Login from '../pages/Login';

// MainRoutes Component
function MainRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

// AppRoutes Component (Top-Level Routes)
export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path='/*' element={<MainRoutes />} />
      </Route>
    </Routes>
  );
}
