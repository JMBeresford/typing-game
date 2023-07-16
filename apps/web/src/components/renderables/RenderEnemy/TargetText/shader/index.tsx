import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { Color, ShaderMaterial } from "three";
import { shaderMaterial } from "@react-three/drei";
import { MaterialNode, extend } from "@react-three/fiber";

type Uniforms = {
  uColorTyped: Color;
  uColorNotTyped: Color;
  uPercentTyped: number;
};

const uniforms: Uniforms = {
  uColorTyped: new Color("red"),
  uColorNotTyped: new Color("white"),
  uPercentTyped: 0,
};

export const BaseTargetTextMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader);
export type TargetTextMaterialProps = Partial<Uniforms> & ShaderMaterial;
extend({ BaseTargetTextMaterial });

declare module "@react-three/fiber" {
  export interface ThreeElements {
    baseTargetTextMaterial: MaterialNode<TargetTextMaterialProps, typeof BaseTargetTextMaterial>;
  }
}

export const TargetTextMaterial = (props: Partial<Uniforms>) => (
  <baseTargetTextMaterial {...props} />
);
