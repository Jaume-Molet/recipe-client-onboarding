import React from 'react'
import { Spinner } from '../Spinner/Spinner'

interface ButtonContentProps {
  loading?: boolean
  iconColor?: string
  iconHeight?: string
  icon?: React.ComponentType<any>
  iconOnTheRight?: boolean
  disabled?: boolean
  spinnerSize?: 'small' | 'medium' | 'large'
  spinnerVariant?: 'light' | 'dark'
  children?: React.ReactNode
}

export function ButtonContent(props: ButtonContentProps) {
  const { loading, icon, iconOnTheRight, children, spinnerVariant = 'dark' } = props

  if (loading) {
    return <Spinner variant={spinnerVariant} />
  }

  const iconElement = icon ? React.createElement(icon, { style: { height: props.iconHeight } }) : null

  return (
    <>
      {!iconOnTheRight && iconElement}
      {children}
      {iconOnTheRight && iconElement}
    </>
  )
}
