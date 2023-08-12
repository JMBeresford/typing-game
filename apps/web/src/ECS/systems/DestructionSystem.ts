import { ECS } from "..";
import { Entity } from "../entities";
import { useEntities, useOnEntityAdded } from "miniplex-react";
import { destroyEntity } from "../actions";
import { useStore } from "@/state";

export function DestructionSystem() {
  const gameOver = useStore(state => state.wave.gameOver);
  const toDestroy = useEntities(ECS.world.with("destroy"));

  useOnEntityAdded(toDestroy, (entity: Entity) => {
    if ("typedCharacters" in entity) {
      gameOver();
    }

    destroyEntity(entity);
  });

  return null;
}
