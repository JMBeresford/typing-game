import { Text } from "@react-three/drei";
import { ECS } from "@/ECS/state";
import { TargetTextMaterial, TargetTextMaterialProps } from "./shader";
import { useRef } from "react";
import { MeshType } from "@/utils";
import { useFrame } from "@react-three/fiber";

const withTypedCharacters = ECS.world.with("typedCharacters");

function getPercentTyped(typedCharacters: string, targetWord: string) {
  let pct = 0;
  for (let i = 0; i < typedCharacters.length; i++) {
    if (typedCharacters[i] !== targetWord[i]) break;
    pct += 1;
  }

  return pct / targetWord.length;
}

export function TargetText(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<MeshType<TargetTextMaterialProps>>(null);
  const entity = ECS.useCurrentEntity();

  useFrame(() => {
    const player = withTypedCharacters.first;
    if (player?.typedCharacters == undefined || !ref.current || !entity.targetWord) return;
    const { typedCharacters } = player;

    const percentTyped = getPercentTyped(typedCharacters, entity.targetWord);
    ref.current.material.uPercentTyped = percentTyped;
  });

  return (
    <Text {...props} ref={ref} position-y={-0.8} font="fonts/OxygenMono-Regular.ttf" fontSize={0.5}>
      {entity.targetWord}
      <TargetTextMaterial />
    </Text>
  );
}
