import React, { useContext } from 'react'
import Context from '@/presentations/contexts/form/form-context'

type Props = {
  text: string
};

const SubmitButton: React.FC<Props> = (props: Props) => {
  const { state } = useContext(Context)

  return (
    <button disabled={!!state.isFormInvalid} data-testid="submit" type="submit">
      {props.text}
    </button>
  )
}

export default SubmitButton
