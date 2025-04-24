'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

import styles from '../styles/components/Header.module.css';
export default function Header() {
  const { user } = useAuth();

  return (

    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <img src="/logo.png" alt="Logo BlogCraft" className={styles.logoImg} />
      </Link>

      <nav className={styles.nav}>
        <Link href="/blogs" className={styles.navLink}>Blogs</Link>
        <Link href="/about" className={styles.navLink}>À propos</Link>

        <div className={styles.authZone}>
          {user ? (
            <>
              <span className={styles.emailText}>
                Connecté en tant que <strong>{user.email}</strong>
              </span>
              <Link href="/profile" className={styles.authLink}>Mon Profil</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className={styles.authLink}>Connexion</Link>
              <Link href="/register" className={styles.authLink}>Inscription</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
