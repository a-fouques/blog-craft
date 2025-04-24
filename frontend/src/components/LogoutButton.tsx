'use client';

import { useRouter } from 'next/navigation';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

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
    <Button variant="secondary" onClick={handleLogout}>
      Se déconnecter
    </Button>
  );
}
