"use client";

import { ReactNode, Suspense } from "react";
import tunnel from "tunnel-rat";

export const SceneTunnel = tunnel();

export function ScenePortal(props: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <SceneTunnel.In>{props.children}</SceneTunnel.In>
      </Suspense>
    </>
  );
}
