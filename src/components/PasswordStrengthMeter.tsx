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
        onChange={(event) => setPassword(event.target.value)}
      />
      <p>Fortaleza: <span>{strength}</span></p>
    </div>
  )
}
