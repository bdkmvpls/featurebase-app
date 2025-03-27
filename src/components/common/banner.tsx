import React from 'react';

interface BannerProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ title, content }) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative text-accent-foreground">
        <h2 className="text-base font-semibold md:text-lg text-white">{title}</h2>
      </div>
      <div className="text-sm text-white/80 mt-1.5 changelog">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Banner;
