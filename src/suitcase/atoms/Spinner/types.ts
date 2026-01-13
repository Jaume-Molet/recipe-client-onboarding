import React from 'react'

export interface SpinnerProps {
  variant?: 'light' | 'dark'
  withDefaultText?: boolean
  text?: React.ReactNode
  'data-testid'?: string
}
