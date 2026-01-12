import styled from 'styled-components'
import { dt } from '../../tokens'

interface TextAreaWrapperProps {
  disabled?: boolean
  validation?: 'error' | 'warning' | 'success' | null
}

export const TextAreaWrapper = styled.div<TextAreaWrapperProps>`
  position: relative;
  width: 100%;
  
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`

export const StyledTextArea = styled.textarea<{
  resize?: string
  minHeight?: string | number
  height?: string | number
}>`
  width: 100%;
  padding: ${dt.dimensions.spacing['1x']};
  font-size: ${dt.fontSizes.md};
  font-family: inherit;
  border: 1px solid #ccc;
  border-radius: ${dt.dimensions.borderRadius.sm};
  box-sizing: border-box;
  resize: ${(props) => props.resize || 'vertical'};
  min-height: ${(props) =>
    typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight || 'auto'};
  height: ${(props) =>
    typeof props.height === 'number' ? `${props.height}px` : props.height || 'auto'};

  &:focus {
    outline: none;
    border-color: #0066cc;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: ${dt.colors.text.secondary};
  }
`
