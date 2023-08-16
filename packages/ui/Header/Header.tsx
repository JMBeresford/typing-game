import styles from "./Header.module.scss";

function HeaderTitle({ children, ...props }: JSX.IntrinsicElements["h1"]) {
  return (
    <h1 className={styles.title} {...props}>
      {children}
    </h1>
  );
}

function Header({ children, ...props }: JSX.IntrinsicElements["header"]) {
  return (
    <header className={styles.header} {...props}>
      {children}
    </header>
  );
}

Header.Title = HeaderTitle;

export { Header };
