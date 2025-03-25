import React, { ReactNode } from 'react';

interface MainLayoutsProps {
  children: ReactNode;  // ReactNode type allows any valid React child
}

const MainLayouts: React.FC<MainLayoutsProps> = ({ children }) => {
  return (
    <div>
      <div>header</div>
      {children}
    </div>
  );
};

export default MainLayouts;
