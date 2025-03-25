import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Avatar } from '@radix-ui/themes';

const UserAvatar: React.FC = () => {
  const { user } = useAuth();
  return (
    <Avatar
      src={user?.user_metadata.avatar_url}
      radius="full"
      size="2"
      fallback={user?.user_metadata.email?.charAt(0).toUpperCase() || ''}
    />
  );
};

export default UserAvatar;
