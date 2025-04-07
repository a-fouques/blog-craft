import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bienvenue sur mon éditeur de blog</h1>
      <Link href="/login">Connexion</Link> | <Link href="/register">Inscription</Link>
    </div>
  );
}
