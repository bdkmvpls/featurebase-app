import React from 'react';
import PostList from './PostList';
import FeedbackBanner from './components/FeedbackBanner';
import Boards from './Boards';
import FilterPanel from './components/FilterPanel';
import SelectedFilters from './components/SelectedFilters';

const PostPage: React.FC = () => {
  return (
    <div className="w-full gap-8 flex flex-col md:flex-row">
      <div className="flex-1 min-h-[70vh]">
        <FeedbackBanner />

        <div className="mt-4">
          <FilterPanel />
        </div>
        <SelectedFilters />

        <div className="my-4 text-left">
          <PostList />
        </div>
      </div>

      <div className="w-60 lg:w-65 text-left">
        <Boards />
      </div>
    </div>
  );
};

export default PostPage;
