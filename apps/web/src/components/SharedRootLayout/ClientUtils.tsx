"use client";

import { Leva } from "leva";
import { useStore } from "@/state";
import { useEffect } from "react";

export function ClientUtils() {
  const debug = useStore(state => state.internal.debug);
  const toggleDebug = useStore(state => state.internal.toggleDebug);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "f2") {
        toggleDebug();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [toggleDebug]);

  return (
    <>
      <Leva hidden={!debug} />
    </>
  );
}
