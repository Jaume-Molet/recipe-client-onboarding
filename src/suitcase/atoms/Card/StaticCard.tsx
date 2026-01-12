import type { StaticCardProps } from './types'
import { dt } from '../../tokens'

export function StaticCard(props: StaticCardProps) {
  const { children, padding, borderRadius, 'data-testid': testId = 'card' } = props

  const paddingValue = typeof padding === 'string' 
    ? (padding in dt.dimensions ? (dt.dimensions as any)[padding] : padding)
    : padding

  const borderRadiusValue = typeof borderRadius === 'string'
    ? (borderRadius in dt.dimensions.borderRadius ? dt.dimensions.borderRadius[borderRadius as keyof typeof dt.dimensions.borderRadius] : borderRadius)
    : borderRadius

  return (
    <div
      data-testid={testId}
      style={{
        padding: paddingValue || '0',
        borderRadius: borderRadiusValue || '0',
        border: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
      }}
    >
      {children}
    </div>
  )
}
