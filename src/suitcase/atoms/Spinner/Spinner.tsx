import { FormattedMessage } from 'react-intl'
import type { SpinnerProps } from './types'
import { CircleSpinner, SpinnerContainer } from './SpinnerComponents'

/**
 * ## Spinner
 *
 * A loading spinner component
 *
 * #### Props
 *
 * - `variant` the color variant of the spinner takes `light` or `dark`
 *
 * - `withDefaultText` if `true` has the text `Loading ...`
 *
 * - `text` the text to be displayed next to the Spinner, Takes a `ReactNode` please only pass a `string` or `FormattedMessage`
 */
function Spinner(props: SpinnerProps) {
  const {
    text,
    variant = 'dark',
    withDefaultText,
    'data-testid': testId = 'spinner',
  } = props

  const textContent = withDefaultText ? (
    <FormattedMessage
      id="ce656033-8e51-4568-b2df-4ada68eee34b"
      defaultMessage="Loading ..."
    />
  ) : (
    text
  )

  return (
    <SpinnerContainer
      data-variant={variant}
      data-testid={`${testId}-container`}
    >
      <CircleSpinner
        data-variant={variant}
        data-size="medium"
        data-testid={`${testId}`}
      />
      {textContent}
    </SpinnerContainer>
  )
}

export { Spinner }
