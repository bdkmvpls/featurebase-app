import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayouts';
import NotFound from '../layouts/NotFound';
import PrivateRoute from '../routes/PrivateRoute';
import Login from '../pages/Login';
import PostList from '../pages/Post';
import Roadmap from '../pages/Roadmap';
import ChangeLogList from '../pages/Changelog';

// MainRoutes Component
function MainRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/changelog" element={<ChangeLogList />} />
        <Route path="/#" element={<Navigate to="/" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/*" element={<MainRoutes />} />
      </Route>
    </Routes>
  );
}
