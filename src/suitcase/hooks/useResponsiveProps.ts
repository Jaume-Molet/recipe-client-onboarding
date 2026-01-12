/**
 * Type for responsive props that can be a single value or an object with breakpoint keys
 */
export type ResponsiveProp<T> = T | { [breakpoint: string]: T }

/**
 * Hook to handle responsive prop values.
 * For minimal implementation, returns the prop value as-is.
 * In a full implementation, this would handle breakpoint-based values.
 * 
 * @param props - Array of responsive prop values
 * @returns Array of resolved prop values
 */
export function useResponsiveProps<T>(
  props: ResponsiveProp<T>[]
): T[] {
  // Minimal implementation: return props as-is
  // In a full implementation, this would check viewport size and return appropriate values
  return props.map((prop) => {
    if (typeof prop === 'object' && prop !== null && !Array.isArray(prop)) {
      // If it's an object (responsive prop), return the first value as default
      const values = Object.values(prop)
      return values.length > 0 ? values[0] : (prop as T)
    }
    return prop as T
  })
}
