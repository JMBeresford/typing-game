import { ReactNode } from "react";
import styles from "./Table.module.scss";

function TableData(props: { children: ReactNode }) {
  return <td>{props.children}</td>;
}

function TableRow(props: { children: ReactNode }) {
  return <tr>{props.children}</tr>;
}

function TableBody(props: { children: ReactNode }) {
  return <tbody>{props.children}</tbody>;
}

function TableHeader(props: { children: ReactNode }) {
  return <thead>{props.children}</thead>;
}

function TableHeaderData(props: { children: ReactNode }) {
  return <th>{props.children}</th>;
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
