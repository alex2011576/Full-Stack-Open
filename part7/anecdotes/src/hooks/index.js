import { useState } from 'react'

export const useField = (type) => {

  const [value, setValue] = useState('')

  const onChange = (e) => {
    e
      ? setValue(e.target.value)
      : setValue('')
  }

  return {
    type,
    value,
    onChange
  }
}