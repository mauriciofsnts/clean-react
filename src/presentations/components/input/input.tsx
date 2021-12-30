import React, { useContext, useRef } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentations/contexts/form/form-context'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = useRef<HTMLInputElement>(null)
  const error = state[`${props.name}Error`]

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        placeholder=" "
        ref={inputRef}
        data-testid={props.name}
        readOnly
        onFocus={(e) => (e.target.readOnly = false)}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
          }))
        }
      />

      <label onClick={() => inputRef.current.focus()}>{props.placeholder}</label>

      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo'}
        className={Styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
