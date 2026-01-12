import React from 'react'
import styles from './GridItem.module.css'

export type GridBasePositioning = 'start' | 'center' | 'end' | 'stretch'

interface GridItemProps {
  children?: React.ReactNode
  gridColumn?: string
  gridRow?: string
  gridArea?: string
  justifySelf?: GridBasePositioning
  alignSelf?: GridBasePositioning
  placeSelf?: string
  'data-testid'?: string
  className?: string
}

/**
 * GridItem Component
 *
 * A grid item component for use within Grid layouts.
 * Provides positioning and alignment props for CSS Grid.
 */
export function GridItem(props: GridItemProps) {
  const {
    children,
    gridColumn,
    gridRow,
    gridArea,
    justifySelf,
    alignSelf,
    placeSelf,
    'data-testid': testId,
    className,
  } = props

  const style: React.CSSProperties = {}
  if (gridColumn) style.gridColumn = gridColumn
  if (gridRow) style.gridRow = gridRow
  if (gridArea) style.gridArea = gridArea
  if (justifySelf) style.justifySelf = justifySelf
  if (alignSelf) style.alignSelf = alignSelf
  if (placeSelf) style.placeSelf = placeSelf

  return (
    <div
      className={`${styles.gridItem} ${className || ''}`}
      style={style}
      data-testid={testId}
    >
      {children}
    </div>
  )
}
