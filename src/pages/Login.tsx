import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '../apis/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='max-w-5xl'>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#5048e5',
                brandAccent: '#7064f2',
              },
            },
          },
        }}
        providers={[]}
        theme='dark'
      />
    </div>
  );
};

export default Login;
