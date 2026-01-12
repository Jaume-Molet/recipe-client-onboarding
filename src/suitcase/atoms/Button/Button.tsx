import type { MouseEvent } from 'react';
import type { ButtonProps } from "./types";
import { ButtonContent } from "./ButtonContent";
import { buttonVariants } from "./buttonVariants";
import { buttonDimensions } from "./buttonDimensions";
import { StyledButton, ZenFocusMask } from "./ButtonComponents";

/**
 * ## Button
 *
 * Buttons are a foundational component of our platform. They allow users to perform actions on a page.
 *
 * #### Props
 * `children`: The content of the button, **should be a string or a FormattedMessage**.
 *
 * `variant`: The visual style of the button.
 *
 * `size`: The size of the button, can be 'default', 'medium', 'small', or 'fullWidth'.
 *
 * `icon`: An optional icon component to display inside the button.
 *
 * `iconOnTheRight`: If true, the icon will be displayed on the right side of the button.
 *
 * `loading`: If true, a spinner will be displayed inside the button.
 *
 * `disabled`: If true, the button will be disabled and not clickable.
 *
 * `onClick`: A function to call when the button is clicked.
 *
 * `submit`: If true, the button will have the `type="submit"` html attribute.
 *
 * `submitRef`: A ref to the button element, useful for form submission.
 *
 * `withZenFocus`: If true, a Zen Focus mask will be applied for accessibility.
 *
 * `accessibleName`: An optional accessible name for the button that populates the `aria-label`, used for screen readers. **Should be used when the button does not have visible text content**.
 *
 * `tabIndex`: The tab index of the button, useful for keyboard navigation.
 *
 * `id`: The id of the button, useful for testing or specific styling.
 *
 * `name`: The name of the button, useful for form submission.
 */
const Button = (props: ButtonProps) => {
  const {
    icon,
    size = "default",
    variant = "secondary",
    accessibleName,
  } = props;

  const {
    buttonHeight,
    buttonWidth,
    borderRadius,
    paddingInline,
    buttonFontSize,
    lineHeight,
    iconHeight,
    spinnerSize,
  } = buttonDimensions[size];

  const {
    backgroundColor,
    backgroundHoverOverlay,
    backgroundPressedOverlay,
    borderColor,
    textColor,
    iconColor,
    spinnerVariant,
    buttonTextDecoration,
  } = buttonVariants[variant];

  return (
    <>
      <StyledButton
        buttonHeight={buttonHeight}
        buttonWidth={buttonWidth}
        backgroundColor={backgroundColor}
        backgroundHoverOverlay={backgroundHoverOverlay}
        backgroundPressedOverlay={backgroundPressedOverlay}
        borderColor={borderColor}
        borderRadius={borderRadius}
        textColor={textColor}
        paddingInline={paddingInline}
        buttonFontSize={buttonFontSize}
        buttonTextDecoration={buttonTextDecoration}
        lineHeight={lineHeight}
        withZenFocus={props.withZenFocus}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          if (!props.loading) {
            props.onClick?.(e);
          }
        }}
        // attributes
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        data-testid={props["data-testid"]}
        type={props.submit ? "submit" : "button"}
        value={props.value}
        aria-label={accessibleName !== "" ? accessibleName : undefined}
      >
        <ButtonContent
          loading={props.loading}
          iconColor={iconColor}
          iconHeight={iconHeight}
          icon={icon}
          iconOnTheRight={props.iconOnTheRight}
          disabled={props.disabled}
          spinnerSize={spinnerSize}
          spinnerVariant={spinnerVariant}
        >
          {props.children}
        </ButtonContent>
      </StyledButton>
      {props.withZenFocus && <ZenFocusMask show data-testid="zen-focus-mask" />}
    </>
  );
};

export { Button };
