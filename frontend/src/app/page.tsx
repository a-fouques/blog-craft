import Link from 'next/link';

import Button from '@/components/Button'

export default function Home() {
  return (
    <div>
      <h1>Bienvenue sur mon éditeur de blog</h1>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="primary">Click me</Button>
        <Button variant="secondary">Try this</Button>
        <Button variant="outline">Outline style</Button>
      </div>
    </div>
  );
}
