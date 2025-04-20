// components/Button.tsx
import styles from '@/styles/components/Button.module.css'
import clsx from 'clsx'


type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}


export default function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    
    <button
      className={clsx(styles.button, styles[variant])}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
