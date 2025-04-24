// components/LinkButton.tsx
'use client';

import Link from 'next/link';
import styles from '@/styles/components/Button.module.css';
import clsx from 'clsx';

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
};

export default function LinkButton({ href, children, variant = 'primary' }: LinkButtonProps) {
  return (
    <Link href={href} className={clsx(styles.button, styles[variant])}>
      {children}
    </Link>
  );
}
