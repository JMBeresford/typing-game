import { useStore } from "@/state";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "ui";

export function PauseScreen() {
  const phase = useStore(state => state.wave.phase);
  const stop = useStore(state => state.clock.stop);
  const start = useStore(state => state.clock.start);
  const [userOpened, setUserOpened] = useState(false);
  const open = useMemo(() => userOpened && phase !== "game over", [userOpened, phase]);

  useEffect(() => {
    const running = useStore.getState().clock.running;
    if (open && running) {
      stop();
    } else if (!open && !running) {
      start();
    }
  }, [open, start, stop]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setUserOpened(prev => !prev);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Modal open={open && phase !== "game over"}>
        <Modal.Header>Paused</Modal.Header>
      </Modal>
    </>
  );
}
