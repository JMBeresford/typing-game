"use client";

import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Button.module.scss";

export function ButtonLink(props: { href: string; children: ReactNode }) {
  return (
    <Link href={props.href} className={styles.link}>
      {props.children}
    </Link>
  );
}
