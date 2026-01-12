import { SpacingKey } from '../../../tokens'
import { BorderRadiusKey } from '../../../tokens'

export interface BaseCardProps {
  children?: React.ReactNode
  padding?: SpacingKey | string
  borderRadius?: BorderRadiusKey | string
  'data-testid'?: string
}

export interface StaticCardProps extends BaseCardProps {}

export interface ClickableCardProps extends BaseCardProps {
  onClick: () => void
}

export interface SelectableCardProps extends BaseCardProps {
  selected: boolean
  onSelect: () => void
}

export type CardProps = StaticCardProps | ClickableCardProps | SelectableCardProps
