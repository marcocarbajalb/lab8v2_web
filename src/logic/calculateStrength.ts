export const STRENGTH_LEVELS = {
  empty: 'vacía',
  weak: 'débil',
  medium: 'media',
  strong: 'fuerte',
  veryStrong: 'muy fuerte',
} as const

export type Strength = (typeof STRENGTH_LEVELS)[keyof typeof STRENGTH_LEVELS]

const MIN_LENGTH = 8
const HAS_NUMBER = /[0-9]/
const HAS_SYMBOL = /[^a-zA-Z0-9]/

export function calculateStrength(password: string): Strength {
  if (password.length === 0) return STRENGTH_LEVELS.empty
  if (password.length < MIN_LENGTH) return STRENGTH_LEVELS.weak

  const hasNumber = HAS_NUMBER.test(password)
  const hasSymbol = HAS_SYMBOL.test(password)

  if (hasNumber && hasSymbol) return STRENGTH_LEVELS.veryStrong
  if (hasNumber) return STRENGTH_LEVELS.strong
  return STRENGTH_LEVELS.medium
}
