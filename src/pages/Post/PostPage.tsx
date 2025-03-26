import React from 'react';
import FilterPanel from './components/FilterPanel';
import PostList from './PostList';
import FeedbackBanner from './components/FeedbackBanner';
import Boards from './Boards';

const PostPage: React.FC = () => {
  return (
    <div className="w-full gap-8 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="w-full min-h-[70vh]">
        <FeedbackBanner />

        <div className="mt-4">
          <FilterPanel />
        </div>

        <div className="mt-4 text-left">
          <PostList />
        </div>
      </div>

      <div className="w-full text-left">
        <Boards />
      </div>
    </div>
  );
};

export default PostPage;
