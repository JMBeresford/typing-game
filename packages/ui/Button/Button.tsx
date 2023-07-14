"use client";

import styles from "./Button.module.scss";

interface ButtonProps {
  type?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

export const Button = ({ type = "primary", size = "medium", label, ...props }: ButtonProps) => {
  return (
    <button type="button" className={`${styles[type]} ${styles[size]}`} {...props}>
      {label}
    </button>
  );
};
