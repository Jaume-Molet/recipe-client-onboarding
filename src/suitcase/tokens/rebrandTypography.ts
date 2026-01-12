/**
 * Typography scale definitions for FormattedText component.
 * This is a minimal implementation for the onboarding exercise.
 */

export const rebrandTypescale: Record<string, Record<string, { fontSize: string; lineHeight: string }>> = {
  body: {
    regular: { fontSize: '16px', lineHeight: '24px' },
    medium: { fontSize: '16px', lineHeight: '24px' },
  },
  headline: {
    regular: { fontSize: '20px', lineHeight: '28px' },
    medium: { fontSize: '20px', lineHeight: '28px' },
  },
  display: {
    regular: { fontSize: '24px', lineHeight: '32px' },
    medium: { fontSize: '24px', lineHeight: '32px' },
  },
  caption: {
    regular: { fontSize: '14px', lineHeight: '20px' },
    medium: { fontSize: '14px', lineHeight: '20px' },
  },
};
