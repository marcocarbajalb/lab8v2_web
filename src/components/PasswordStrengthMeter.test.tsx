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

  describe('barra de progreso', () => {
    it('renderiza una barra de progreso accesible con valor inicial 0', () => {
      render(<PasswordStrengthMeter />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toBeInTheDocument()
      expect(progressbar).toHaveAttribute('aria-valuenow', '0')
      expect(progressbar).toHaveAttribute('aria-valuemin', '0')
      expect(progressbar).toHaveAttribute('aria-valuemax', '4')
    })

    it('avanza la barra a 1 cuando la contraseña es débil', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)

      await user.type(input, 'abc')

      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1')
    })

    it('avanza la barra a 2 cuando la contraseña es media', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)

      await user.type(input, 'abcdefgh')

      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2')
    })

    it('avanza la barra a 3 cuando la contraseña es fuerte', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)

      await user.type(input, 'password1')

      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '3')
    })

    it('avanza la barra a 4 cuando la contraseña es muy fuerte', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)

      await user.type(input, 'password1!')

      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '4')
    })
  })

})
