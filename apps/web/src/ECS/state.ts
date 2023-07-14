import createECS from "miniplex-react";
import { World } from "miniplex";
import { Entity } from "./entities";

const world = new World<Entity>();
export const ECS = createECS<Entity>(world);
