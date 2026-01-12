import { dt } from '../../tokens'
import { FormattedText } from '../FormattedText/FormattedText'

interface HelperTextAndErrorsProps {
  value?: string
  maxLength?: number
  disclaimerText?: string
  validation?: 'error' | 'warning' | 'success' | null
  validationMessages?: string[]
  warningCharsLeft?: number
  warningText?: string
}

/**
 * HelperTextAndErrors Component
 *
 * Displays validation messages, warnings, character counts, and disclaimer text
 * for form inputs like TextArea.
 */
export function HelperTextAndErrors(props: HelperTextAndErrorsProps) {
  const {
    value = '',
    maxLength,
    disclaimerText,
    validation,
    validationMessages,
    warningCharsLeft,
    warningText,
  } = props

  const currentLength = value.length
  const charsRemaining = maxLength ? maxLength - currentLength : null

  return (
    <div style={{ marginTop: dt.dimensions.spacing['1x'] }}>
      {disclaimerText && (
        <FormattedText fontSize={dt.fontSizes.sm} color={dt.colors.text.secondary}>
          {disclaimerText}
        </FormattedText>
      )}

      {validation === 'error' && validationMessages && validationMessages.length > 0 && (
        <div>
          {validationMessages.map((message, index) => (
            <FormattedText
              key={index}
              fontSize={dt.fontSizes.sm}
              color={dt.colors.text.error}
            >
              {message}
            </FormattedText>
          ))}
        </div>
      )}

      {validation === 'warning' && warningText && (
        <FormattedText fontSize={dt.fontSizes.sm} color={dt.colors.text.secondary}>
          {warningText}
        </FormattedText>
      )}

      {maxLength && (
        <FormattedText fontSize={dt.fontSizes.sm} color={dt.colors.text.secondary}>
          {charsRemaining !== null && charsRemaining <= (warningCharsLeft || 0)
            ? `${charsRemaining} characters remaining`
            : `${currentLength}/${maxLength} characters`}
        </FormattedText>
      )}
    </div>
  )
}
