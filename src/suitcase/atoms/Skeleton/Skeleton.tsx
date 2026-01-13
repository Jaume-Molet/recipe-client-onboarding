// No runtime React import needed with the modern JSX transform

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string
  lightDark?: 'light' | 'dark'
  'data-skeleton'?: string
  'data-testid'?: string
}

export function Skeleton(props: SkeletonProps) {
  const { width, height, borderRadius, lightDark = 'light', 'data-testid': testId } = props

  return (
    <div
      data-testid={testId}
      style={{
        width: typeof width === 'number' ? `${width}px` : width || '100%',
        height: typeof height === 'number' ? `${height}px` : height || '20px',
        borderRadius: borderRadius || '4px',
        backgroundColor: lightDark === 'light' ? '#f0f0f0' : '#e0e0e0',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}
    >
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  )
}
