import React from 'react'
import { SelectableCardProps } from './types'
import { StaticCard } from './StaticCard'

export function SelectableCard(props: SelectableCardProps) {
  const { selected, onSelect, ...rest } = props
  return (
    <div 
      onClick={onSelect} 
      style={{ 
        cursor: 'pointer',
        border: selected ? '2px solid #0066cc' : '1px solid #e0e0e0',
      }}
    >
      <StaticCard {...rest} />
    </div>
  )
}
