"use client";

import { ReactNode, useCallback, useState } from "react";
import styles from "./Modal.module.scss";

function Modal(props: { open: boolean; backdropClickCloses?: boolean; children: ReactNode }) {
  const [closedByBackdrop, setClosedByBackdrop] = useState(false);

  const handleClick = useCallback(() => {
    if (props.backdropClickCloses === true) {
      setClosedByBackdrop(false);
    }
  }, [props.backdropClickCloses]);

  return (
    <div
      className={`${styles.backdrop} ${props.open && !closedByBackdrop ? "" : styles.hidden}`}
      onClick={handleClick}
    >
      <div className={styles.modal}>{props.children}</div>
    </div>
  );
}

Modal.Header = function ModalHeader(props: { children: ReactNode }) {
  return (
    <div className={styles.header}>
      {props.children}
      <hr />
    </div>
  );
};

Modal.TextContent = function ModalTextContent(props: { children: ReactNode }) {
  return <div className={styles.textContent}>{props.children}</div>;
};

Modal.Footer = function ModalFooter(props: { children: ReactNode }) {
  return <div className={styles.footer}>{props.children}</div>;
};

export { Modal };
