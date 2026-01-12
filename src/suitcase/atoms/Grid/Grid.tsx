import styled from 'styled-components'
import type { StyledComponentProps } from 'styled-components'
import { useResponsiveProps } from '../../hooks'
import type { ResponsiveProp } from '../../hooks'
import { GridItem } from './GridItem'
import type { GridBasePositioning } from './GridItem'
import { pick } from '../../utils'

const whitelistValues = [
  'display',
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridTemplateAreas',
  'gridAutoRows',
  'gridAutoColumns',
  'gridAutoFlow',
  'justifyContent',
  'alignContent',
  'justifyItems',
  'alignItems',
  'columnGap',
  'rowGap',
  'gap',
] as const

type GridContentPositioning =
  | GridBasePositioning
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

export type GridProps = StyledComponentProps<
  'div',
  any,
  {
    children?: import('react').ReactNode
    display?: 'grid' | 'inline-grid'
    gridTemplateColumns?: ResponsiveProp<string>
    gridTemplateRows?: ResponsiveProp<string>
    gridTemplateAreas?: ResponsiveProp<string>
    gridAutoRows?: ResponsiveProp<string>
    gridAutoColumns?: ResponsiveProp<string>
    gridAutoFlow?: ResponsiveProp<string>
    justifyItems?: GridBasePositioning
    alignItems?: GridBasePositioning
    justifyContent?: GridContentPositioning
    alignContent?: GridContentPositioning
    columnGap?: string
    rowGap?: string
    gap?: string
  },
  never
>

const Grid = styled.div<GridProps>((props) => {
  const whiteListedProps = pick(props, whitelistValues)

  const [gridTemplateColumns, gridTemplateRows, gridTemplateAreas] =
    useResponsiveProps([
      props.gridTemplateColumns,
      props.gridTemplateRows,
      props.gridTemplateAreas,
    ])

  const [gridAutoRows, gridAutoColumns, gridAutoFlow] = useResponsiveProps([
    props.gridAutoRows,
    props.gridAutoColumns,
    props.gridAutoFlow,
  ])

  return {
    display: 'grid',
    height: '100%',
    '& *': {
      boxSizing: 'border-box',
    },
    ...whiteListedProps,
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    gridAutoRows,
    gridAutoColumns,
    gridAutoFlow,
  }
})

type GridComponentType = import('react').ForwardRefExoticComponent<
  GridProps & import('react').RefAttributes<HTMLDivElement>
> & {
  Item: typeof GridItem
}
export { GridComponent as Grid }
export type { GridBasePositioning }
import { forwardRef } from 'react'
const GridComponent = forwardRef<HTMLDivElement, GridProps>(
  function GridComponent(props, ref) {
    return <Grid {...props} ref={ref} />
  }
) as GridComponentType

GridComponent.Item = GridItem

// (removed duplicate export)
