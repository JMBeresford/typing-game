import Link, { LinkProps } from "next/link";
import styles from "./Nav.module.scss";
import { ElementType, ReactNode } from "react";

type NavItemType = "link" | "button";

const Item: Record<NavItemType, ElementType> = {
  link: Link,
  button: "button",
};

type ConditionalProps =
  | {
      itemType: "button";
      href?: never;
    }
  | {
      itemType: "link";
      href: LinkProps["href"];
    };

function NavItem({
  children,
  itemType = "link",
  ...props
}: {
  children?: ReactNode;
  itemType?: NavItemType;
} & JSX.IntrinsicElements["a" | "button"] &
  ConditionalProps) {
  const ItemImpl = Item[itemType];
  return (
    <ItemImpl {...props} className={`${styles.navItem} ${styles[itemType]}`}>
      {children}
    </ItemImpl>
  );
}

function Nav({ children, ...props }: JSX.IntrinsicElements["nav"]) {
  return (
    <nav {...props} className={styles.nav}>
      {children}
    </nav>
  );
}

Nav.Item = NavItem;

export { Nav };
