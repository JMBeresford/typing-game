import { useThree } from "@react-three/fiber";
import { useCallback, useMemo } from "react";

const MAX_PIXELS = 1750;

export function useMaxWidth(targetPosition: [number, number, number] = [0, 0, 0]) {
  const size = useThree(state => state.size);
  const camera = useThree(state => state.camera);
  const viewport = useThree(state => state.viewport).getCurrentViewport(camera, targetPosition);
  const maxWidth = useMemo(() => {
    // ratio of THREE units to pixels
    const ratio = viewport.width / size.width;

    // max out at 1750px, else 90% of viewport
    return Math.min(viewport.width * 0.9, ratio * MAX_PIXELS);
  }, [viewport, size]);

  return maxWidth;
}

export function useMaxWidthGetter() {
  const size = useThree(state => state.size);
  const camera = useThree(state => state.camera);
  const { getCurrentViewport } = useThree(state => state.viewport);

  const getMaxWidth = useCallback(
    (targetPosition: [number, number, number] = [0, 0, 0]) => {
      const viewport = getCurrentViewport(camera, targetPosition);

      // ratio of THREE units to pixels
      const ratio = viewport.width / size.width;

      // max out at 1750px, else 90% of viewport
      return Math.min(viewport.width * 0.9, ratio * MAX_PIXELS);
    },
    [getCurrentViewport, size, camera],
  );

  return getMaxWidth;
}
