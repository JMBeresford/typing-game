import styles from "./Form.module.scss";

function Form({ children, ...props }: JSX.IntrinsicElements["form"]) {
  return (
    <form {...props} className={styles.form}>
      {children}
    </form>
  );
}

Form.Error = function FormError({ children, ...props }: JSX.IntrinsicElements["p"]) {
  return (
    <p {...props} className={styles.error}>
      {children}
    </p>
  );
};

export { Form };
