import { SpacingKey } from '../../../tokens'

export interface BoxProps {
  children?: React.ReactNode
  padding?: SpacingKey | string
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string
  elevation?: string
  'data-testid'?: string
}
