import { useMaxHeight } from "@/hooks/useMaxHeight";
import { useStore } from "@/state";
import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

const AnimText = animated(Text);

export function WaveIndicator() {
  const maxHeight = useMaxHeight();
  const waveNumber = useStore(state => state.wave.waveNumber);
  const phase = useStore(state => state.wave.phase);
  const endTime = useStore(state => state.wave.endTime);
  const timeBetweenWaves = useStore(state => state.wave.timeBetweenWaves);
  const [timer, setTimer] = useState(0);

  const { waveIndicatorOpacity, timerOpacity } = useSpring({
    waveIndicatorOpacity: phase === "wave" ? 1 : 0,
    timerOpacity: phase === "preparing" ? 1 : 0,
  });

  useFrame(() => {
    if (endTime != undefined && phase === "preparing") {
      const timeForNextWave = endTime + timeBetweenWaves - performance.now();
      if (timeForNextWave > 0) {
        setTimer(Math.ceil(timeForNextWave / 1000));
      }
    }
  });

  return (
    <>
      <AnimText
        anchorY="top"
        position-y={(maxHeight / 2) * 0.95}
        fontSize={0.8}
        fillOpacity={waveIndicatorOpacity}
      >
        Wave: {waveNumber}
      </AnimText>

      <AnimText anchorY="bottom" anchorX="center" fontSize={1} fillOpacity={timerOpacity}>
        Next Wave Starts In
      </AnimText>
      <AnimText anchorY="top" anchorX="center" fontSize={1} fillOpacity={timerOpacity}>
        {timer}
      </AnimText>
    </>
  );
}
