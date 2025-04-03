import React from 'react'

import styles from './Button.module.scss'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
}

const Button = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  )
}

export default Button
