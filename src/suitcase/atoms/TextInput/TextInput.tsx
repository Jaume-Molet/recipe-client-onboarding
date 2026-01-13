import type { InputHTMLAttributes } from 'react'
import type { TextInputProps } from './types'
import styles from './TextInput.module.css'

/**
 * TextInput Component
 *
 * A self-contained text input component following the Suitcase design system.
 * This is a minimal implementation for the onboarding exercise.
 */
function TextInput(props: TextInputProps) {
  const {
    id,
    'data-testid': dataTestId = 'text-input',
    value = '',
    onChange,
    onFocus,
    onBlur,
    name,
    placeholder,
    disabled = false,
    readOnly = false,
    required = false,
    type = 'text',
    autoComplete = 'off',
    minLength,
    maxLength,
    className,
  } = props

  return (
    <input
      id={id}
      data-testid={dataTestId}
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      autoComplete={autoComplete}
      minLength={minLength}
      maxLength={maxLength}
      className={`${styles.textInput} ${className || ''}`}
    />
  )
}

export { TextInput }
