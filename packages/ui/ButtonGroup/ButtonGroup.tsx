import styles from "./ButtonGroup.module.scss";

export function ButtonGroup({ children, ...props }: JSX.IntrinsicElements["div"]) {
  return (
    <div {...props} className={styles.buttonGroup}>
      {children}
    </div>
  );
}
