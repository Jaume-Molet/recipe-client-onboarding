import React from 'react'
import styled from 'styled-components'
import { TextInputProps } from './types'
import { dt } from '../../tokens'

const StyledInput = styled.input<{ disabled?: boolean }>`
  width: 100%;
  padding: ${dt.dimensions.spacing['1x']};
  font-size: ${dt.fontSizes.md};
  border: 1px solid #ccc;
  border-radius: ${dt.dimensions.borderRadius.sm};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0066cc;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: ${dt.colors.text.secondary};
  }
`

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
  } = props

  return (
    <StyledInput
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
    />
  )
}

export { TextInput }
