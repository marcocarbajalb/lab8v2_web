import { useState } from 'react'
import { calculateStrength } from '../logic/calculateStrength'

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')
  const strength = calculateStrength(password)

  return (
    <div>
      <label htmlFor="password-input">Contraseña</label>
      <input
        id="password-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p data-testid="strength-indicator">{strength}</p>
    </div>
  )
}