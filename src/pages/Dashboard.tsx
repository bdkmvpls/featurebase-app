import React from 'react';
import useLogout from '../hooks/useLogout';

const Dashboard: React.FC = () => {
  const { logout } = useLogout();

  return (
    <div>
      Dashboard
      <button
        onClick={async () => {
          await logout(); // Ensure to handle the async logout function properly
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Dashboard;
