import React from 'react'
import { BoxProps } from './types'
import styles from './Box.module.css'

function Box(props: BoxProps) {
  const {
    children,
    backgroundColor = 'backgroundDefault',
    borderColor = 'borderDefault',
    borderRadius = 'borderRadiusSm',
    elevation = 'none',
    'data-testid': testId = 'box',
  } = props
  return (
    <div
      className={styles.box}
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
