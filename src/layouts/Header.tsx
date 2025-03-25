import React from 'react';

import ToolBar from './ToolBar';
import NavBar from './NavBar';

const Header: React.FC = () => {
  return (
    <div className="w-full bg-secondary/40 border border-border px-6 flex justify-center">
      <div className="max-w-5xl w-full pt-4 mx-4 ">
        <ToolBar />
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
