import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const submitButton = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(submitButton.disabled).toBe(isDisabled)
}

export const testStatusForField = (
  fieldName: string,
  validationError: string = ''
): void => {
  const field = screen.getByTestId(`${fieldName}`)
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const label = screen.getByTestId(`${fieldName}-label`)

  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  )
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value: value } })
}

export const testElementExists = (fieldName: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}
