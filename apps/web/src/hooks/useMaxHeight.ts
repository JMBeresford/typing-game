import { useThree } from "@react-three/fiber";
import { useCallback, useMemo } from "react";

export function useMaxHeight(targetPosition: [number, number, number] = [0, 0, 0]) {
  const size = useThree(state => state.size);
  const camera = useThree(state => state.camera);
  const viewport = useThree(state => state.viewport).getCurrentViewport(camera, targetPosition);
  const maxHeight = useMemo(() => {
    // ratio of THREE units to pixels
    const ratio = viewport.height / size.height;

    // max out at 1750px, else 90% of viewport
    return Math.min(viewport.height * 0.9, ratio * 1750);
  }, [viewport, size]);

  return maxHeight;
}

export function useMaxHeightGetter() {
  const size = useThree(state => state.size);
  const camera = useThree(state => state.camera);
  const { getCurrentViewport } = useThree(state => state.viewport);

  const getMaxHeight = useCallback(
    (targetPosition: [number, number, number] = [0, 0, 0]) => {
      const viewport = getCurrentViewport(camera, targetPosition);

      // ratio of THREE units to pixels
      const ratio = viewport.height / size.height;

      // max out at 1750px, else 90% of viewport
      return Math.min(viewport.height * 0.9, ratio * 1750);
    },
    [getCurrentViewport, size, camera],
  );

  return getMaxHeight;
}
