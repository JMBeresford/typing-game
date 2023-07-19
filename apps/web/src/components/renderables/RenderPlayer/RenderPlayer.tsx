import { ECS } from "@/ECS/state";
import { useMaxHeight, useMaxWidth } from "@/hooks";
import { Text } from "@react-three/drei";

export function RenderPlayer() {
  const maxWidth = useMaxWidth([0, 0, 14.8]);
  const maxHeight = useMaxHeight([0, 0, 14.8]) * 0.9;
  const player = ECS.useCurrentEntity();

  return (
    <group>
      <Text anchorY="bottom-baseline" fontSize={0.02} position={[0, -maxHeight / 2, -0.2]}>
        {player?.typedCharacters}
      </Text>

      <Text
        fontSize={0.01}
        anchorX="left"
        anchorY="bottom-baseline"
        position={[-maxWidth / 2, -maxHeight / 2, -0.2]}
      >
        Shields: {player?.shields?.current}/{player?.shields?.max}
      </Text>
    </group>
  );
}
