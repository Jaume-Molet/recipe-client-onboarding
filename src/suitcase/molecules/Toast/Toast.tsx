import React from 'react'
import { FormattedText, ButtonIcon } from '../../atoms'
import { ToastStyleType, ToastProps } from './types'
import { Button, Variant } from '../../atoms/Button'
import { ButtonIconWrapper, ToastWrapper } from './ToastComponents'
import { useIntl } from 'react-intl'
import { CrossIcon } from '../../icons'

const Toast = (props: ToastProps) => {
  const {
    styleType = ToastStyleType.Dark,
    message,
    onAction,
    onClose,
    variant,
    'data-testid': testId = 'toast',
  } = props

  const { formatMessage } = useIntl()

  const isDark = styleType === ToastStyleType.Dark

  const textColor = isDark ? 'textInverted' : 'textNegative'
  const buttonVariant: Variant = isDark ? 'primary' : 'negativeSecondary'

  const hasAction = variant === 'with-action' && props.actionText
  const isDismissible = variant === 'dismissable'

  const dismissNotificationText = formatMessage({
    id: '5cfe345a-6d00-4cff-8822-445e7fab965c',
    defaultMessage: 'Dismiss Notification',
  })

  return (
    <ToastWrapper styleType={styleType} data-testid={testId}>
      <FormattedText textStyle="caption" textColor={textColor}>
        {message}
      </FormattedText>
      <>
        {hasAction && (
          <Button size="small" variant={buttonVariant} onClick={onAction}>
            {props.actionText}
          </Button>
        )}
      </>
      <>
        {isDismissible && (
          <ButtonIconWrapper>
            <ButtonIcon
              icon={CrossIcon}
              onClick={onClose}
              accessibleName={dismissNotificationText}
              data-testid="close-toast"
            />
          </ButtonIconWrapper>
        )}
      </>
    </ToastWrapper>
  )
}

export { Toast }
