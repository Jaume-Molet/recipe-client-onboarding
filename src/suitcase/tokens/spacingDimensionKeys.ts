/**
 * Utility function to check if a string is a valid spacing dimension key.
 */

import type { SpacingKey } from './types';

export function isSpacingDimensionKey(value: string): value is SpacingKey {
  return value === '1x' || value === '2x' || value === '3x';
}
