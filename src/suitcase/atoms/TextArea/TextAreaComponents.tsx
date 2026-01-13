import { dt } from '../../tokens'
import styles from './TextAreaComponents.module.css'

interface TextAreaWrapperProps {
  disabled?: boolean
  validation?: 'error' | 'warning' | 'success' | null
  children?: React.ReactNode
}

export function TextAreaWrapper(props: TextAreaWrapperProps) {
  const { disabled, validation, children } = props
  const className = `${styles.textAreaWrapper} ${disabled ? styles.disabled : ''} ${validation ? styles[validation] : ''}`
  
  return <div className={className}>{children}</div>
}

import type { CSSProperties } from 'react'
interface StyledTextAreaProps {
  resize?: CSSProperties['resize']
  minHeight?: string | number
  height?: string | number
  [key: string]: any
}

export function StyledTextArea(props: StyledTextAreaProps) {
  const { resize, minHeight, height, ...rest } = props
  
  const style: CSSProperties = {
    padding: dt.dimensions.spacing['1x'],
    fontSize: dt.fontSizes.md,
    fontFamily: 'inherit',
    border: '1px solid #ccc',
    borderRadius: dt.dimensions.borderRadius.sm,
    boxSizing: 'border-box',
    resize: resize || 'vertical',
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight || 'auto',
    height: typeof height === 'number' ? `${height}px` : height || 'auto',
  }
  
  return <textarea className={styles.styledTextArea} style={style} {...rest} />
}
