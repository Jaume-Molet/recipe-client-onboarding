import styled from 'styled-components'

export const SpinnerContainer = styled.div<{ children?: import('react').ReactNode }>`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const CircleSpinner = styled.div<{
  'data-variant'?: 'light' | 'dark'
  'data-size'?: 'small' | 'medium' | 'large'
  'data-testid'?: string
}>`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid ${(props) => (props['data-variant'] === 'light' ? '#ffffff' : '#0066cc')};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
