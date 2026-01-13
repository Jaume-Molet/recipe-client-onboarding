import { useRef } from 'react'

let idCounter = 0

/**
 * Hook to generate a unique ID for form elements.
 * Uses a counter-based approach for React 17 compatibility.
 * 
 * @returns A unique string ID
 */
export function useId(): string {
  const idRef = useRef<string | null>(null)
  
  if (idRef.current === null) {
    idCounter += 1
    idRef.current = `suitcase-id-${idCounter}`
  }
  
  return idRef.current
}
