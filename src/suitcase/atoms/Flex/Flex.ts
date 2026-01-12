import styled from 'styled-components'
import type { FlexProps } from './types'
import { paddingKeys } from './types'
import type { CSSProperties, ReactNode } from 'react'
import { dt, isSpacingDimensionKey } from '../../tokens'

const whitelistValues = [
  'display',
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'alignContent',
  'order',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'flex',
  'alignSelf',
  'position',
] as const

type WhitelistValue = (typeof whitelistValues)[number]

const whitelistSet = new Set<WhitelistValue>(whitelistValues)

/**
 * ## Flex
 *
 * A convenient wrapper over a flex element.
 *
 * #### Props
 *
 * `display` - Allows changing the display property to `inline-flex`
 *
 * `position` - Set the CSS position property, eg `absolute`, `relative`
 *
 * `fullWidth` - Set the width to 100%
 *
 * `className` - Adds a class to the underlying `<div>` element
 *
 * `data-testid` - testing id
 *
 * `flexDirection` - Sets the flex-direction, takes `row`, `row-reverse`, `column`, `column-reverse`
 *
 * `flexWrap` - Sets the flex-wrap property and takes `wrap` and `nowrap`
 *
 * `justifyContent` - Sets the justify-content property and takes values like `space-between`, `center`...
 *
 * `alignItems` - Sets the `align-items` property and takes values like `start`, `center`, `end`
 *
 * `alignContent` - Sets the `align-content` property and takes values like `start`, `center`, `end`
 *
 * `alignSelf` - Sets the `align-self` property and takes values like `start`, `center`, `end`
 *
 * `order` - Sets the `order` when a flex child
 *
 * `gap` - Sets the `gap` property and take a SpacingDimensionKey or pixel value. Can also take two of these separated by a space to set the `row-gap` and `column-gap` respectively
 *
 * `flexGrow` - Sets the `flex-grow` when a flex child
 *
 * `flexShrink` - Sets the `flex-shrink` when a flex child
 *
 * `flexBasis` - Sets the `flex-basis` when a flex child
 *
 * `padding` - Sets the padding of the Flex component and takes a `SpacingDimensionKey`
 *
 * `paddingInline` - Sets the horizontal padding of the Flex component and takes a `SpacingDimensionKey`
 *
 * `paddingBlock` - Sets the vertical padding of the Flex component and takes a `SpacingDimensionKey`
 *
 * `paddingTop` - Sets the top padding of the Flex component and takes a `SpacingDimensionKey`
 *
 * `paddingRight` - Sets the right padding of the Flex component and takes a `SpacingDimensionKey`
 *
 * `paddingBottom` - Sets the padding bottom of the Flex component and takes a `SpacingDimensionKey`
 *
 * `paddingLeft` - Sets the left padding of the Flex component and takes a `SpacingDimensionKey`
 */
const Flex = styled.div<FlexProps>((props) => {
  const cleanedProps: {
    [key: string]: string | number | ReactNode | CSSProperties
  } = {}

  for (const [key, value] of Object.entries(props)) {
    if (whitelistSet.has(key as WhitelistValue)) {
      cleanedProps[key] =
        value === 'start' || value === 'end' ? `flex-${value}` : value
    }
  }

  for (const key of paddingKeys) {
    const value = props[key]
    if (value !== undefined) {
      cleanedProps[key] = dt.dimensions[value]
    }
  }

  if (props.gap) {
    const gapPropValue = props.gap
    if (isSpacingDimensionKey(gapPropValue)) {
      cleanedProps.gap = dt.dimensions[gapPropValue]
    } else if (gapPropValue.includes(' ')) {
      const [firstValue, secondValue] = gapPropValue.split(' ')
      if (
        isSpacingDimensionKey(firstValue) &&
        isSpacingDimensionKey(secondValue)
      ) {
        cleanedProps.gap = `${dt.dimensions[firstValue]} ${dt.dimensions[secondValue]}`
      } else {
        cleanedProps.gap = gapPropValue
      }
    } else {
      cleanedProps.gap = gapPropValue
    }
  }

  if (props.fullWidth) {
    cleanedProps.width = '100%'
  }

  return { display: 'flex', ...cleanedProps }
})

export { Flex }
