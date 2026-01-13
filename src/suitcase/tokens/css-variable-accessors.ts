/**
 * Design tokens for Suitcase design system.
 * This is a minimal implementation for the onboarding exercise.
 */

// Spacing values used by Flex component
const spacingValues = {
  '1x': '8px',
  '2x': '16px',
  '3x': '24px',
} as const;

export const dt = {
  dimensions: {
    // Direct access for spacing keys (used by Flex component)
    ...spacingValues,
    // Nested access for explicit spacing
    spacing: spacingValues,
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
  },
  fontSizes: {
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
  },
  colors: {
    text: {
      primary: '#000000',
      secondary: '#666666',
      error: '#d32f2f',
    },
  },
} as const;
