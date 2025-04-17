/**
 * Determines if a background color is considered "colored" (not black or white)
 * @param bgColor - The background color in hex format (with or without leading #)
 * @returns boolean indicating if the background is colored
 */
export function isColoredBackground(bgColor?: string | null): boolean {
  if (!bgColor) return false
  
  // Remove # if present and convert to lowercase
  const normalizedColor = bgColor.replace('#', '').toLowerCase()
  
  // Check if the color is neither black nor white (in both 3 and 6 digit formats)
  return !['fff', 'ffffff', '000', '000000'].includes(normalizedColor)
}

// Add any other shared utility functions here... 