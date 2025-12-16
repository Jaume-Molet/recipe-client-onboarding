import React from 'react'
import styled, { StyledComponentProps } from 'styled-components'
import { useResponsiveProps, ResponsiveProp } from '../../../hooks'
import { GridItem, GridBasePositioning } from './GridItem'
import { pick } from '../../../utils'

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
    children?: React.ReactNode
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

type GridComponentType = React.ForwardRefExoticComponent<
  GridProps & React.RefAttributes<HTMLDivElement>
> & {
  Item: typeof GridItem
}

const GridComponent = React.forwardRef<HTMLDivElement, GridProps>(
  function GridComponent(props, ref) {
    return <Grid {...props} ref={ref} />
  }
) as GridComponentType

GridComponent.Item = GridItem

export { GridComponent as Grid }
