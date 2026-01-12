import type React from 'react'
import type { ElementType, ForwardedRef, ElementRef } from 'react'

export type TextStyle = 'body' | 'headline' | 'display' | 'caption'
export type FontWeight = 'regular' | 'medium'
export type TextColorKey = string

export interface FormattedTextProps<C extends ElementType = 'div'> {
  as?: C
  children?: React.ReactNode
  textColor?: TextColorKey
  overflowWrap?: string
  textStyle?: TextStyle
  className?: string
  fontWeight?: FontWeight
  inline?: boolean
  lineThrough?: boolean
  neutralLineHeight?: boolean
  placeholderWidth?: string | number
  showPlaceholder?: boolean
  truncate?: boolean
  vAlign?: string
  align?: 'center' | 'right' | 'left' | 'justify'
  whiteSpace?: string
  'data-testid'?: string
  css?: any // DEPRECATED
  fontSize?: string
  color?: string
  [key: string]: any // Allow other HTML attributes
}

export type FormattedTextComponent = <C extends ElementType = 'div'>(
  props: FormattedTextProps<C> & { ref?: ForwardedRef<ElementRef<C>> }
) => React.ReactElement | null
