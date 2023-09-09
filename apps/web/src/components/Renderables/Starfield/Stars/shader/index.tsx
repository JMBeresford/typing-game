import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { AdditiveBlending, DoubleSide, ShaderMaterial } from "three";
import { MaterialNode, extend } from "@react-three/fiber";

type Uniforms = {
  uTime?: number;
  uVelocity?: number;
};

const uniforms: Required<Uniforms> = {
  uTime: 0,
  uVelocity: 0,
};

export type StarsMaterial = Partial<Uniforms> & ShaderMaterial;

const BaseStarsMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, m => {
  if (m instanceof ShaderMaterial) {
    m.transparent = true;
    m.depthWrite = false;
    m.toneMapped = true;
    m.side = DoubleSide;
    m.blending = AdditiveBlending;
    m.premultipliedAlpha = true;
  }
});

extend({ BaseStarsMaterial });

declare module "@react-three/fiber" {
  export interface ThreeElements {
    baseStarsMaterial: MaterialNode<StarsMaterial, typeof BaseStarsMaterial>;
  }
}

export const StarsMaterial = (props: Uniforms) => <baseStarsMaterial {...props} />;
export const key = BaseStarsMaterial.key;
