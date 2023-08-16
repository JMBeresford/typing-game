"use client";

import { MouseEvent, ReactNode, useCallback, useState } from "react";
import styles from "./Modal.module.scss";

function Modal(props: {
  open: boolean;
  backdropClickCloses?: boolean;
  children: ReactNode;
  onClose?: () => void;
}) {
  const { onClose, backdropClickCloses } = props;
  const [closedByBackdrop, setClosedByBackdrop] = useState(false);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (backdropClickCloses && e.target === e.currentTarget) {
        if (onClose) {
          onClose();
        } else {
          setClosedByBackdrop(true);
        }
      }
    },
    [backdropClickCloses, onClose],
  );

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
