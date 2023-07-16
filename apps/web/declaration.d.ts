declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.glsl" {
  const content: string;
  export default content;
}
