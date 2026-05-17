import { useState } from 'react'
import { calculateStrength, STRENGTH_LEVELS, type Strength } from '../logic/calculateStrength'
import './PasswordStrengthMeter.css'

const STRENGTH_TO_VALUE: Record<Strength, number> = {
  [STRENGTH_LEVELS.empty]: 0,
  [STRENGTH_LEVELS.weak]: 1,
  [STRENGTH_LEVELS.medium]: 2,
  [STRENGTH_LEVELS.strong]: 3,
  [STRENGTH_LEVELS.veryStrong]: 4,
}

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')
  const strength = calculateStrength(password)
  const value = STRENGTH_TO_VALUE[strength]

  return (
    <div className="meter">
      <label htmlFor="password-input" className="meter__label">
        Contraseña
      </label>
      <input
        id="password-input"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="meter__input"
        placeholder="Escribe tu contraseña..."
      />

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Nivel de fortaleza"
        className="meter__bar"
        data-strength={value}
      >
        <div className="meter__bar-fill" />
      </div>

      <p className="meter__status">
        Fortaleza: <span data-strength={value}>{strength}</span>
      </p>
    </div>
  )
}
