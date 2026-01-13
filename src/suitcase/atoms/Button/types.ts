import React from 'react'

export type Variant = 'primary' | 'secondary' | 'negativeSecondary'
export type Size = 'default' | 'medium' | 'small' | 'fullWidth'

export interface ButtonProps {
  children?: React.ReactNode
  variant?: Variant
  size?: Size
  icon?: React.ComponentType<any>
  iconOnTheRight?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  submit?: boolean
  submitRef?: React.RefObject<HTMLButtonElement>
  withZenFocus?: boolean
  accessibleName?: string
  tabIndex?: number
  id?: string
  name?: string
  value?: string
  'data-testid'?: string
}
