import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { BackSide, Color, Material, ShaderMaterial, Texture } from "three";
import { MaterialNode, extend } from "@react-three/fiber";

type Uniforms = {
  uTime?: number;
  uVelocity?: number;
  uColor1?: Color | number;
  uColor2?: Color | number;
  uColor3?: Color | number;
  uColor4?: Color | number;
  uTexture1?: Texture;
  uTexture2?: Texture;
  uTextureWarp1?: Texture;
  uResolution?: [number, number];
};

const uniforms: Required<Uniforms> = {
  uTime: 0,
  uVelocity: 0,
  uColor1: new Color(0x000000),
  uColor2: new Color(0x000000),
  uColor3: new Color(0x000000),
  uColor4: new Color(0x000000),
  uTexture1: new Texture(),
  uTexture2: new Texture(),
  uTextureWarp1: new Texture(),
  uResolution: [0, 0],
};

export type NebulaeMaterial = Partial<Uniforms> & ShaderMaterial;

const BaseNebulaeMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, m => {
  if (m instanceof Material) {
    m.transparent = false;
    m.depthWrite = false;
    m.side = BackSide;
    m.toneMapped = true;
  }
});

extend({ BaseNebulaeMaterial: BaseNebulaeMaterial });

declare module "@react-three/fiber" {
  export interface ThreeElements {
    baseNebulaeMaterial: MaterialNode<NebulaeMaterial, typeof BaseNebulaeMaterial>;
  }
}

export const NebulaeMaterial = (props: Uniforms) => <baseNebulaeMaterial {...props} />;
export const key = BaseNebulaeMaterial.key;
