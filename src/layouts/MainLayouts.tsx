import React, { ReactNode } from 'react';
import Header from './Header';

interface MainLayoutsProps {
  children: ReactNode; // ReactNode type allows any valid React child
}

const MainLayouts: React.FC<MainLayoutsProps> = ({ children }) => {
  return (
    <div className="w-full min-w-screen min-h-screen bg-app-background">
      <Header />
      <div className="w-full h-full flex justify-center bg-app-background">
        <div className="w-full max-w-5xl mt-8 md:px-6 xl:px-0 px-4">{children}</div>
      </div>
    </div>
  );
};

export default MainLayouts;
