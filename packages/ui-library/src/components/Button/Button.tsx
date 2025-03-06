import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { Link } from "react-router-dom";

export interface ButtonProps
  extends Omit<MuiButtonProps, "color" | "variant" | "href"> {
  variant?: "primary" | "secondary" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  to,
  ...props
}) => {
  let muiVariant: "contained" | "outlined" | "text" = "contained";
  let sx = {};
  if (variant === "primary") {
    sx = { bgcolor: "#03356b", "&:hover": { bgcolor: "#02284f" } };
  } else if (variant === "secondary") {
    sx = { bgcolor: "#d5a050", "&:hover": { bgcolor: "#c28e40" } };
  } else if (variant === "text") {
    muiVariant = "text";
    sx = {
      color: "#1976d2",
      "&:hover": { bgcolor: "rgba(3, 53, 107, 0.04)" },
    };
  }

  return (
    <MuiButton
      variant={muiVariant}
      size={size}
      sx={sx}
      component={to ? Link : undefined}
      {...(to ? { to } : {})}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
