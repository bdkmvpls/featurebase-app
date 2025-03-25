import supabase from '../apis/supabaseClient';

// Type for the hook's return value
interface UseLogoutReturnType {
  logout: () => Promise<void>;
}

export default function useLogout(): UseLogoutReturnType {
  const handleSignOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      console.log('Logged out successfully');
      // Optionally, you can redirect the user to the login page after logout
      window.location.href = '/login'; // Or use React Router for navigation
    }
  };

  return {
    logout: handleSignOut,
  };
}
