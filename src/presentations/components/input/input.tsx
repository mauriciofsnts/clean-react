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
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${props.name}-wrap`}
    >
      <input
        {...props}
        placeholder=" "
        ref={inputRef}
        title={error}
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

      <label
        onClick={() => inputRef.current.focus()}
        title={error}
        data-testid={`${props.name}-label`}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
