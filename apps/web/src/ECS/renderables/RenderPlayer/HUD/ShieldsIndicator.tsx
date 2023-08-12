import { ECS } from "@/ECS";
import { useMaxHeight } from "@/hooks/useMaxHeight";
import { useMaxWidth } from "@/hooks/useMaxWidth";
import { Text } from "@react-three/drei";

export function ShieldsIndicator() {
  const maxWidth = useMaxWidth([0, 0, 14.8]);
  const maxHeight = useMaxHeight([0, 0, 14.8]) * 0.9;
  const player = ECS.useCurrentEntity();

  return (
    <>
      <Text
        fontSize={0.01}
        anchorX="left"
        anchorY="bottom-baseline"
        position={[-maxWidth / 2, -maxHeight / 2, -0.2]}
      >
        Shields: {player?.shields?.current}/{player?.shields?.max}
      </Text>
    </>
  );
}
