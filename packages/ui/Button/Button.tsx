import { ReactNode } from "react";
import styles from "./Button.module.scss";
import { ButtonLink } from "./ButtonLink";

type ButtonProps = {
  priority?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children: ReactNode;
} & JSX.IntrinsicElements["button"];

function Button({ priority = "primary", size = "medium", children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[priority]} ${styles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.Link = ButtonLink;

export { Button };
