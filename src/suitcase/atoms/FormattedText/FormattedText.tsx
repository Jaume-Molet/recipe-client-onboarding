import React, { ElementType, forwardRef, ForwardedRef, ElementRef } from 'react'
import { FormattedTextComponent, FormattedTextProps } from './types'
import styles from './FormattedText.module.css'
import { Skeleton } from '../Skeleton'
import { getPlaceholderColorFromTextStyle } from './utils'
import { rebrandTypescale } from '../../../tokens'

function InnerFormattedText<C extends ElementType = 'div'>(
  props: FormattedTextProps<C>,
  ref: ForwardedRef<ElementRef<C>>
) {
  const {
    as: TagName = 'div',
    children,
    textColor,
    overflowWrap,
    textStyle = 'body',
    className,
    fontWeight,
    inline,
    lineThrough,
    neutralLineHeight,
    placeholderWidth = '150px',
    showPlaceholder = false,
    truncate,
    vAlign,
    align,
    whiteSpace,
    'data-testid': testId,
    // exclude css from attributes this prop does its work at a higher level by creating a class name
    css,
    // these are html attributes that we want to pass through to the underlying element
    // for example, disabled, htmlFor etc.
    ...attributes
  } = props

  if (showPlaceholder) {
    const height = neutralLineHeight
      ? rebrandTypescale[textStyle][fontWeight || 'regular'].fontSize
      : rebrandTypescale[textStyle][fontWeight || 'regular'].lineHeight

    return (
      <Skeleton
        width={placeholderWidth}
        height={height}
        borderRadius="borderRadiusSm"
        lightDark={getPlaceholderColorFromTextStyle(textStyle)}
        data-skeleton=""
        data-testid={testId}
      />
    )
  }

  const style: React.CSSProperties = {}
  if (props.fontSize) {
    style.fontSize = props.fontSize
  }
  if (props.color) {
    style.color = props.color
  }

  return (
    <TagName
      ref={ref}
      className={`${styles.formattedText} ${className ? className : ''}`}
      style={style}
      data-text-color={textColor || undefined}
      data-text-style={textStyle}
      data-font-weight={fontWeight || undefined}
      data-inline={inline ? '' : undefined}
      data-overflow-wrap={overflowWrap || undefined}
      data-line-through={lineThrough ? '' : undefined}
      data-neutral-line-height={neutralLineHeight ? '' : undefined}
      data-truncate={truncate ? '' : undefined}
      data-align={align || undefined}
      data-vertical-align={vAlign || undefined}
      data-white-space={whiteSpace || undefined}
      data-testid={testId}
      {...attributes}
    >
      {children}
    </TagName>
  )
}

/**
 * ## FormattedText
 *
 * FormattedText defines visual identity and readability in user interfaces. Our system uses seven styles tailored by purpose (e.g., display, headline) and scale (large, small) for scalability. The default type scale, OT Sono, unifies titles, labels, and body text, ensuring a clear hierarchy and consistent appearance across components.
 *
 * #### Props
 *
 * `as` - Allows rendering the component as a different HTML element. Defaults to 'div'.
 *
 * `textStyle` - Defines the typographic style to be applied. Defaults to 'body'.
 *
 * `fontWeight` - Sets the weight of the font. Options are 'regular' and 'medium'. Note some `textStyle`s may not support all weights.
 *
 * `textColor` - Specifies the color of the text. Accepts a `TextColorKey` or 'default' for standard text color.
 *
 * `showPlaceholder` - If true, displays a loading placeholder instead of the text content.
 *
 * `placeholderWidth` - Sets the width of the placeholder when `showPlaceholder` is true. Can be a number (pixels) or string (e.g., '50%').
 *
 * `inline` - If true, renders the text as a `display: inline-block` element.
 *
 * `truncate` - If true, truncates the text with an ellipsis if it overflows its container.
 *
 * `lineThrough` - If true, applies a line-through style to the text.
 *
 * `overflowWrap` - Controls how the text should wrap when it overflows. Accepts standard CSS `overflow-wrap` values.
 *
 * `neutralLineHeight` - If true, applies a neutral line height for better vertical alignment.
 *
 * `align` - Sets the text alignment. Options are 'center', 'right', 'left', and 'justify'.
 *
 * `vAlign` - Sets the vertical alignment of the text. Accepts values defined in `VerticalAlign`.
 *
 * `whiteSpace` - Controls how white space inside the element is handled. Accepts standard CSS `white-space` values.
 *
 * `className` - Additional CSS class names to apply to the component. Try to avoid using this class modifying the core styles directly. Note: all font-properties are available as CSS variables `--typescale-`
 *
 * `data-testid` - A unique identifier for testing purposes.
 *
 * `css` - DEPRECATED DO NOT USE
 *
 * #### Attributes
 *
 * All other HTML attributes are passed through to the underlying element, allowing for additional customization such as `disabled`, `htmlFor`, etc.
 *
 */
export const FormattedText = forwardRef(
  InnerFormattedText
) as FormattedTextComponent
