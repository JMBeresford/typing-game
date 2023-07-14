import { useEntities } from "miniplex-react";
import { ECS } from "../state";
import { Text } from "@react-three/drei";
import { getLogger } from "@lib/logging";
import { useEffect, useLayoutEffect } from "react";

const log = getLogger(__filename);

const withWave = ECS.world.with("wave");

export function WaveIndicator() {
  useLayoutEffect(() => {
    log.debug("Init wave indicator");
    const p = ECS.world.add({ wave: 0 });

    return () => {
      ECS.world.remove(p);
    };
  }, []);

  const entities = useEntities(withWave);
  const { wave } = entities.first ?? { wave: 0 };

  useEffect(() => {
    if (entities.size > 1) {
      log.warn("More than one entity with wave component");
    }
  }, [entities]);

  return (
    <ECS.Entity>
      <ECS.Component name="transform">
        <Text fillOpacity={0.25}>Wave {wave}</Text>
      </ECS.Component>
    </ECS.Entity>
  );
}
