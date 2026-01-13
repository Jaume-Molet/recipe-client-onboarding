// No runtime React import needed with the modern JSX transform

interface InputLabelProps {
  label: string
  htmlFor?: string
  'data-testid'?: string
  optionalText?: string
}

/**
 * InputLabel Component
 *
 * A simple label component for form inputs with optional text support.
 * Used by TextArea and other form components.
 */
export function InputLabel(props: InputLabelProps) {
  const { label, htmlFor, 'data-testid': testId, optionalText } = props

  return (
    <label htmlFor={htmlFor} data-testid={testId}>
      {label}
      {optionalText && <span style={{ marginLeft: '4px', color: '#666' }}>{optionalText}</span>}
    </label>
  )
}
