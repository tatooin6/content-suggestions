import React from "react";
import { IconType } from "react-icons";
import "./Button.css";

interface ButtonProps {
  action: () => void;
  label: string;
  isDisabled?: boolean;
  icon?: IconType;
}

const Button = ({
  action,
  label,
  isDisabled = false,
  icon: IconComponent,
}: ButtonProps) => {
  const buttonStyles = isDisabled ? "button-disabled" : "button-primary";

  return (
    <button
      className={`button ${buttonStyles}`}
      disabled={isDisabled}
      onClick={() => action()}
    >
      {IconComponent && <IconComponent className="icon" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
