import React, { ReactNode } from 'react';
import Header from './Header';
import { Theme } from '@radix-ui/themes';

interface MainLayoutsProps {
  children: ReactNode; // ReactNode type allows any valid React child
}

const MainLayouts: React.FC<MainLayoutsProps> = ({ children }) => {
  return (
    <Theme appearance="dark" accentColor="gray">
      <div className="w-full min-w-screen min-h-screen bg-app-background">
        <Header />
        <div className="w-full h-full flex justify-center bg-app-background">
          <div className="w-full max-w-5xl mt-8 mx-auto">{children}</div>
        </div>
      </div>
    </Theme>
  );
};

export default MainLayouts;
