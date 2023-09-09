import { ForwardedRef, forwardRef } from "react";
import { HUD } from "./HUD";
import { Group } from "three";

function RenderPlayerImpl(props: JSX.IntrinsicElements["group"], ref: ForwardedRef<Group>) {
  return (
    <group {...props} ref={ref}>
      <HUD />
    </group>
  );
}

export const RenderPlayer = forwardRef(RenderPlayerImpl);
