import { CardProps, ClickableCardProps, SelectableCardProps } from './types'

export function isComponentPropsClickableCardProps(
  props: CardProps
): props is ClickableCardProps {
  return 'onClick' in props && typeof props.onClick === 'function'
}

export function isComponentPropsSelectableCardProps(
  props: CardProps
): props is SelectableCardProps {
  return 'selected' in props && 'onSelect' in props && typeof props.onSelect === 'function'
}
