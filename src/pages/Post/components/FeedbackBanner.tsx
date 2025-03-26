import React from 'react';

const FeedbackBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative text-accent-foreground">
        <h2 className="text-base font-semibold md:text-lg text-white">Share your product feedback!</h2>
      </div>
      <div className="text-sm text-white/80 mt-1.5 changelog">
        <p>Please tell us what we can do to make Featurebase the best product for you.</p>
      </div>
    </div>
  );
};

export default FeedbackBanner;
