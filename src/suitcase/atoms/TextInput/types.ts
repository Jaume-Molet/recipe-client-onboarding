import React from 'react'

export interface TextInputProps {
  id?: string
  'data-testid'?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  name?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  type?: string
  autoComplete?: string
  minLength?: number
  maxLength?: number
}
