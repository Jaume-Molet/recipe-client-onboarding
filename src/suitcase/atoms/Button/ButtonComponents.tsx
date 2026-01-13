import styled from 'styled-components'
import type React from 'react'

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonHeight: string
  buttonWidth: string
  backgroundColor: string
  backgroundHoverOverlay: string
  backgroundPressedOverlay: string
  borderColor: string
  borderRadius: string
  textColor: string
  paddingInline: string
  buttonFontSize: string
  buttonTextDecoration: string
  lineHeight: string
  withZenFocus?: boolean
}

export const StyledButton = styled.button<StyledButtonProps>`
  height: ${(props) => props.buttonHeight};
  width: ${(props) => props.buttonWidth};
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.textColor};
  padding: 0 ${(props) => props.paddingInline};
  font-size: ${(props) => props.buttonFontSize};
  line-height: ${(props) => props.lineHeight};
  text-decoration: ${(props) => props.buttonTextDecoration};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${(props) => 
      props.backgroundHoverOverlay.includes('rgba')
        ? `color-mix(in srgb, ${props.backgroundColor} 90%, ${props.backgroundHoverOverlay})`
        : props.backgroundColor
    };
  }

  &:active:not(:disabled) {
    background-color: ${(props) => 
      props.backgroundPressedOverlay.includes('rgba')
        ? `color-mix(in srgb, ${props.backgroundColor} 85%, ${props.backgroundPressedOverlay})`
        : props.backgroundColor
    };
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const ZenFocusMask = styled.div<{ show?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  z-index: 9999;
`
