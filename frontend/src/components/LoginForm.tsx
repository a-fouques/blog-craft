'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}
      <button
        type="submit"
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Se connecter
      </button>
    </form>
  );
}
