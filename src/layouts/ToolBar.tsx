import React from 'react';
import imgLogo from '../assets/logo.webp';
import UserProfileMenu from '../components/UserProfileMenu';
import NotificationMenu from '../components/NotificationMenu';

const ToolBar: React.FC = () => {
  return (
    <div className="flex justify-between">
      <div className="flex justify-start items-center">
        <img src={imgLogo} className="w-9 h-9 rounded-full" alt="logo" />
        <h2 className="text-white text-xl ml-2 font-bold">Featurebase</h2>
      </div>

      <div className="flex justify-end">
        <NotificationMenu />
        <div className="rounded-full ml-3 w-9 h-9 mr-3 flex justify-center items-center">
          <UserProfileMenu />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
