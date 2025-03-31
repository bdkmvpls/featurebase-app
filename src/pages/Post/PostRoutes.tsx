import { Route, Routes } from 'react-router-dom';

import useGetBoardItems from '@/hooks/useGetBoardItems';

import PostDetailPage from './PostDetailPage';
import PostLayout from './PostLayout';
import NotFound from '@/layouts/NotFound';
import PostList from './PostList';

export default function PostRoutes() {
  const { boards } = useGetBoardItems();

  return (
    <Routes>
      <Route path="*" element={<PostLayout />}>
        <Route index element={<PostList />} />

        <Route path=":id" element={<PostDetailPage />} />
        {boards.map(({ label, path }) => {
          return <Route key={label} path={path.split('/').at(-1)} element={<PostList />} />;
        })}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
