import React from 'react'
import { SelectableCard } from './SelectableCard'
import { StaticCard } from './StaticCard'
import { CardProps } from './types'
import { ClickableCard } from './ClickableCard'
import {
  isComponentPropsClickableCardProps,
  isComponentPropsSelectableCardProps,
} from './utils'

export function Card(props: CardProps) {
  if (isComponentPropsSelectableCardProps(props)) {
    return <SelectableCard {...props} />
  }

  if (isComponentPropsClickableCardProps(props)) {
    return <ClickableCard {...props} />
  }

  return <StaticCard {...props} />
}
