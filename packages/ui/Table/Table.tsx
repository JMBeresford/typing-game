import styles from "./Table.module.scss";

function TableData({ children, ...props }: JSX.IntrinsicElements["td"]) {
  return <td {...props}>{children}</td>;
}

function TableRow({ children, ...props }: JSX.IntrinsicElements["tr"]) {
  return <tr {...props}>{children}</tr>;
}

function TableBody({ children, ...props }: JSX.IntrinsicElements["tbody"]) {
  return <tbody {...props}>{children}</tbody>;
}

function TableHeader({ children, ...props }: JSX.IntrinsicElements["thead"]) {
  return <thead {...props}>{children}</thead>;
}

function TableHeaderData({ children, ...props }: JSX.IntrinsicElements["th"]) {
  return <th {...props}>{children}</th>;
}

function Table({ children, className, ...props }: JSX.IntrinsicElements["table"]) {
  return (
    <table className={`${styles.table} ${className}`} {...props}>
      {children}
    </table>
  );
}

Table.Header = TableHeader;
Table.HeaderData = TableHeaderData;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Data = TableData;

export { Table };
