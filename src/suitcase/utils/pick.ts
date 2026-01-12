/**
 * Utility function to pick specific keys from an object.
 * Returns a new object containing only the specified keys.
 * 
 * @param obj - The source object
 * @param keys - Array of keys to pick from the object
 * @returns A new object with only the picked keys
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  
  return result
}
