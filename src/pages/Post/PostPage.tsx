import React from 'react';
import CreatePostButton from './components/CreatePostButton';
import FilterPanel from './components/FilterPanel';
import PostList from './PostList';
import FeedbackBanner from './components/FeedbackBanner';
import Boards from './Boards';

const PostPage: React.FC = () => {
  return (
    <div className="w-full mt-4 gap-8 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="w-full min-h-[70vh]">
        <div className="relative border rounded-lg shadow group border-accent/25">
          <div className="w-full bg-accent/50 rounded-lg p-4 text-left">
            <FeedbackBanner />
            <div className="lg:hidden mt-3">
              <CreatePostButton />
            </div>
          </div>
        </div>

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
