import React from 'react'
import { SuitcaseInternalTextInput } from './SuitcaseInternalTextInput'
import { TextInputProps } from './types'

function TextInput(props: TextInputProps) {
  return <SuitcaseInternalTextInput {...props} />
}

export { TextInput }
