'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

import styles from '../styles/components/LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/login', { email, password });
      const res = await api.get('/user/me');
      setUser(res.data);
      router.push('/');
    } catch (err: any) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <h2 className={styles.title}>Connexion à votre compte</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit">Se connecter</Button>
        </form>
      </div>
    </div>
  );
}
