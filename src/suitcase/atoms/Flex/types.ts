import type React from 'react'
import type { SpacingKey } from '../../tokens'

export const paddingKeys = [
  'padding',
  'paddingInline',
  'paddingBlock',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
] as const

export interface FlexProps {
  display?: 'flex' | 'inline-flex'
  position?: string
  fullWidth?: boolean
  className?: string
  'data-testid'?: string
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  flexWrap?: 'wrap' | 'nowrap'
  justifyContent?: string
  alignItems?: string
  alignContent?: string
  alignSelf?: string
  order?: number
  gap?: SpacingKey | string
  flexGrow?: number
  flexShrink?: number
  flexBasis?: string | number
  padding?: SpacingKey
  paddingInline?: SpacingKey
  paddingBlock?: SpacingKey
  paddingTop?: SpacingKey
  paddingRight?: SpacingKey
  paddingBottom?: SpacingKey
  paddingLeft?: SpacingKey
  marginBottom?: SpacingKey | string
  children?: React.ReactNode
}
