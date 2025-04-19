'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

export default function Header() {
  const { user } = useAuth();

  return (
    <header style={{
      padding: '1rem',
      backgroundColor: '#f4f4f4',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1>
        <Link href="/" style={{ textDecoration: 'none', color: '#333' }}>
          BlogCraft
        </Link>
      </h1>
      <nav>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>
              Connecté en tant que <strong>{user.email}  </strong>
              
            </span>
            <span>
              <Link href="/profile" style={{ textDecoration: 'none', color: '#333' }}>
                  Mon Profil
              </Link>
            </span>
            
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" style={{ marginRight: '1rem' }}>Connexion</Link>
            <Link href="/register">Inscription</Link>
          </>
        )}
      </nav>
    </header>
  );
}
