import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordStrengthMeter } from './PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
  describe('renderizado', () => {
    it('renderiza un input de tipo password', () => {
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'password')
    })

    it('muestra la fortaleza inicial como "vacía"', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByText('vacía')).toBeInTheDocument()
    })
  })

  describe('comportamiento', () => {
    it('muestra "débil" al escribir una contraseña corta', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)

      await user.type(input, 'abc')

      expect(screen.getByText('débil')).toBeInTheDocument()
    })

    it('muestra "media" al escribir 8+ caracteres sin números ni símbolos', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)

      await user.type(input, 'abcdefgh')

      expect(screen.getByText('media')).toBeInTheDocument()
    })

    it('muestra "fuerte" al escribir 8+ caracteres con al menos un número', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)

      await user.type(input, 'password1')

      expect(screen.getByText('fuerte')).toBeInTheDocument()
    })

    it('muestra "muy fuerte" al escribir 8+ caracteres con número y símbolo', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)

      await user.type(input, 'password1!')

      expect(screen.getByText('muy fuerte')).toBeInTheDocument()
    })

    it('vuelve a mostrar "vacía" al borrar completamente la contraseña', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)

      await user.type(input, 'password1!')
      await user.clear(input)

      expect(screen.getByText('vacía')).toBeInTheDocument()
    })
  })
})