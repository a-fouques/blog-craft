import LoginForm from '@/components/LoginForm';
import React from 'react';


export default function LoginPage() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Connexion</h2>
      <LoginForm />
    </div>
  );
}
