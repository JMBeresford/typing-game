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
  return <th>{props.children}</th>;
}

function Table(props: { children: ReactNode }) {
  return <table className={styles.table}>{props.children}</table>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Data = TableData;

export { Table };
