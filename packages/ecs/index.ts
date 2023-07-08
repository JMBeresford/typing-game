import { World } from "miniplex";
import createReactApi from "miniplex/react";
import { Entity } from "./entities";

const world = new World<Entity>();

export const ECS = createReactApi(world);
