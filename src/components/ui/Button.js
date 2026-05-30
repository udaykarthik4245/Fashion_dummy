import Link from 'next/link'
import styles from './Button.module.css'

/**
 * Polymorphic button — renders a <button> or a Next.js <Link> depending on `as`.
 *
 * Props:
 *   as       – 'button' | 'link'    (default 'button')
 *   variant  – 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost'
 *   size     – 'sm' | 'md' | 'lg'  (default 'md')
 *   href     – required when as='link'
 */
export default function Button({
  children,
  as        = 'button',
  variant   = 'primary',
  size      = 'md',
  href,
  type      = 'button',
  disabled  = false,
  onClick,
  className = '',
  ...rest
}) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ')

  if (as === 'link' && href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
