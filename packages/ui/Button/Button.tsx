import { ReactNode } from "react";
import styles from "./Button.module.scss";
import { ButtonLink } from "./ButtonLink";

type ButtonProps = {
  type?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children: ReactNode;
} & Omit<JSX.IntrinsicElements["button"], "type">;

function Button({ type = "primary", size = "medium", children, ...props }: ButtonProps) {
  return (
    <button type="button" className={`${styles.button} ${styles[type]} ${styles[size]}`} {...props}>
      {children}
    </button>
  );
}

Button.Link = ButtonLink;

export { Button };
