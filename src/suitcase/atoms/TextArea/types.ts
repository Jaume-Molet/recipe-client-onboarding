import React from 'react'

export interface TextAreaProps {
  id?: string
  'data-testid'?: string
  value?: string
  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  name?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  label?: string
  disclaimerText?: string
  rows?: number
  wrap?: 'soft' | 'hard' | 'off'
  autoComplete?: string
  minHeight?: string | number
  height?: string | number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  validation?: 'error' | 'warning' | 'success' | null
  validationMessages?: string[]
  warningText?: string
  warningCharsLeft?: number
  optionalText?: string
  minLength?: number
  maxLength?: number
}
