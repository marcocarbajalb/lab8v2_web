import { describe, it, expect } from 'vitest'
import { calculateStrength } from './calculateStrength'

describe('calculateStrength', () => {
  it('retorna "vacía" cuando la contraseña es un string vacío', () => {
    expect(calculateStrength('')).toBe('vacía')
  })

  it('retorna "débil" para contraseñas de menos de 8 caracteres', () => {
    expect(calculateStrength('abc')).toBe('débil')
    expect(calculateStrength('1234567')).toBe('débil')
  })

  it('retorna "débil" para una contraseña de exactamente 7 caracteres', () => {
    expect(calculateStrength('abcdefg')).toBe('débil')
  })

  it('retorna "débil" para una contraseña corta compuesta solo de símbolos', () => {
    expect(calculateStrength('!@#$')).toBe('débil')
  })

  it('retorna "media" para una contraseña de 8 o más caracteres sin números ni símbolos', () => {
    expect(calculateStrength('abcdefgh')).toBe('media')
    expect(calculateStrength('abcdefghij')).toBe('media')
  })

  it('retorna "media" para una contraseña de exactamente 8 caracteres sin números', () => {
    expect(calculateStrength('abcdefgh')).toBe('media')
  })

  it('retorna "fuerte" para una contraseña de 8+ caracteres con al menos un número', () => {
    expect(calculateStrength('abcdefg1')).toBe('fuerte')
    expect(calculateStrength('password1')).toBe('fuerte')
  })

  it('retorna "muy fuerte" para una contraseña de 8+ caracteres con número y símbolo', () => {
    expect(calculateStrength('abcdef1!')).toBe('muy fuerte')
    expect(calculateStrength('password1@')).toBe('muy fuerte')
  })

  it('considera el espacio como símbolo', () => {
    expect(calculateStrength('abcdef1 ')).toBe('muy fuerte')
  })
})