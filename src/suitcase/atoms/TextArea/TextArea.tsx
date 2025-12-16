import { TextAreaProps } from './types'
import { InputLabel } from '../InputLabel'
import { StyledTextArea, TextAreaWrapper } from './TextAreaComponents'
import { HelperTextAndErrors } from './HelperTextAndErrors'
import React from 'react'
import { useId } from '../../../hooks'

function TextArea(props: TextAreaProps) {
  const {
    id: idFromProps,
    'data-testid': dataTestId = 'textarea',
    value = '',
    onChange,
    onFocus,
    onBlur,
    name,
    placeholder,
    disabled = false,
    label,
    disclaimerText,
    rows,
    wrap = 'soft',
    autoComplete = 'off',
    minHeight,
    height,
    readOnly = false,
    required = false,
    resize = disabled ? 'none' : 'vertical',
    validation,
    validationMessages,
    warningText,
    warningCharsLeft,
    optionalText,
    minLength,
    maxLength,
  } = props

  const hookId = useId()
  const id = idFromProps ? idFromProps : hookId

  return (
    <div>
      {label && (
        <InputLabel
          label={label}
          htmlFor={id}
          data-testid={`${dataTestId}-label`}
          optionalText={optionalText}
        />
      )}
      <TextAreaWrapper disabled={disabled} validation={validation}>
        <StyledTextArea
          id={id}
          data-testid={dataTestId}
          value={value}
          onChange={(evt) => onChange(evt.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          placeholder={placeholder}
          minHeight={minHeight}
          height={height}
          readOnly={readOnly}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          resize={resize}
          rows={rows}
          wrap={wrap}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      </TextAreaWrapper>
      <HelperTextAndErrors
        value={value}
        maxLength={maxLength}
        disclaimerText={disclaimerText}
        validation={validation}
        validationMessages={validationMessages}
        warningCharsLeft={warningCharsLeft}
        warningText={warningText}
      />
    </div>
  )
}

export { TextArea }
