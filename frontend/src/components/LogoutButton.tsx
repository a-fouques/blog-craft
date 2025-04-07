'use client';

import { useRouter } from 'next/navigation';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function LogoutButton() {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('Erreur lors de la déconnexion :', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
      }}
    >
      Se déconnecter
    </button>
  );
}
