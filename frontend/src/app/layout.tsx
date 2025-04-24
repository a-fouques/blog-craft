'use client';

import Header from '@/components/Header';
import '../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <Header />
          <main style={{ padding: '2rem' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
