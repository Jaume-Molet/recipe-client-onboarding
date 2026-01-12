import React from 'react'
import { BoxProps } from './types'
import { dt } from '../../tokens'
import styles from './Box.module.css'

function Box(props: BoxProps) {
  const {
    children,
    padding,
    backgroundColor = 'backgroundDefault',
    borderColor = 'borderDefault',
    borderRadius = 'borderRadiusSm',
    elevation = 'none',
    'data-testid': testId = 'box',
  } = props
  
  const paddingValue = typeof padding === 'string' 
    ? (padding in dt.dimensions ? (dt.dimensions as any)[padding] : padding)
    : padding
  
  const style: React.CSSProperties = paddingValue ? { padding: paddingValue } : {}
  
  return (
    <div
      className={styles.box}
      style={style}
      data-testid={testId}
      data-background={backgroundColor}
      data-border-color={borderColor}
      data-border-radius={borderRadius}
      data-elevation={elevation}
    >
      {children}
    </div>
  )
}

export { Box }
