import createReactApi from "miniplex/react";
import { Entity } from "./entities";
import { World } from "miniplex";

const world = new World<Entity>();

world.add({
  wave: 0,
});

export const ECS = createReactApi(world);
