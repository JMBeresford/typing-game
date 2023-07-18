import { ECS } from "../state";
import { Text } from "@react-three/drei";
import { useStore } from "@/store";

export function WaveIndicator() {
  const { waveNumber } = useStore(state => state.wave);

  return (
    <ECS.Entity>
      <ECS.Component name="transform">
        <Text fillOpacity={0.25}>Wave {waveNumber}</Text>
      </ECS.Component>
    </ECS.Entity>
  );
}
