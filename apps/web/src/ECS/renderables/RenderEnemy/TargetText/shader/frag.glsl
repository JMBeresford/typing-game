uniform vec3 uColorTyped;
uniform vec3 uColorNotTyped;
uniform float uPercentTyped;

varying vec2 vUv;

void main() {
  vec3 color = mix(uColorTyped, uColorNotTyped, step(uPercentTyped, vUv.x));

  gl_FragColor = vec4(color, 1.0);
}