import { ECS } from "@/ECS";
import { useMaxHeight } from "@/hooks/useMaxHeight";
import { Text } from "@react-three/drei";
import { ShieldsIndicator } from "./ShieldsIndicator";

export function HUD() {
  const maxHeight = useMaxHeight([0, 0, 14.8]) * 0.9;
  const player = ECS.useCurrentEntity();

  return (
    <group>
      <Text anchorY="bottom-baseline" fontSize={0.02} position={[0, -maxHeight / 2, -0.2]}>
        {player?.typedCharacters}
      </Text>

      <ShieldsIndicator />
    </group>
  );
}
