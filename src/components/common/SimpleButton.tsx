import * as React from "react";
import { Button, ButtonProps, Spinner } from "theme-ui";
import { TApiaButtonType } from "../../types";

export interface ISimpleButton extends ButtonProps {
  id?: string | undefined;
  name?: string;
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode | null;
  disabled?: boolean;
  visible?: boolean;
  variant?: string;
  ml?: number[];
  mt?: number[];
  px?: string;
  py?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  width?: (number | string)[];
}

const SimpleButton = React.forwardRef(
  (
    {
      id,
      name,
      title,
      onClick,
      children = null,
      disabled = false,
      visible = true,
      ml = [0, 0, 0],
      mt = [0, 0, 0],
      px,
      py,
      isLoading,
      size,
      className,
      width,
      ...buttonProps
    }: ISimpleButton,
    ref
  ) => {
    return (
      <Button
        id={id}
        name={name}
        ref={ref as React.Ref<HTMLButtonElement>}
        title={title}
        aria-label={title}
        type="button"
        onClick={onClick}
        disabled={isLoading || disabled}
        className={className}
        sx={{
          variant: `buttons.${buttonProps.variant}${
            size !== "md" && size ? `-${size}` : ""
          }`,
          display: visible ? "inline-block" : "none",
          ml,
          mt,
          px,
          py,
          ...(width ? { width } : {}), // This is necessary because if width is assigned directly it will override the variant width
          // and will make the button to get width=100%
        }}
        {...buttonProps}
      >
        {isLoading ? <Spinner size="16" color="inherit" /> : children || title}
      </Button>
    );
  }
);

export default SimpleButton;
