import React from 'react'
import { ClickableCardProps } from './types'
import { StaticCard } from './StaticCard'

export function ClickableCard(props: ClickableCardProps) {
  const { onClick, ...rest } = props
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <StaticCard {...rest} />
    </div>
  )
}
