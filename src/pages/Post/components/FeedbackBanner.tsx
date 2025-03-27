import React from 'react';
import CreatePostButton from './CreatePostButton';
import Banner from '@/components/common/banner';

const FeedbackBanner: React.FC = () => {
  return (
    <div className="relative border rounded-lg shadow group border-accent/25">
      <div className="w-full bg-accent/13 rounded-lg p-4 text-left">
        <Banner
          title="Share your product feedback!"
          content="Please tell us what we can do to make Featurebase the best product for you."
        />

        <div className="lg:hidden mt-3">
          <CreatePostButton />
        </div>
      </div>
    </div>
  );
};

export default FeedbackBanner;
