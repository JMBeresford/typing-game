varying vec2 vUv;
varying vec3 vColor;
varying float vOpacity;

void main() {
  float mask = max(1.0 - distance(vUv, vec2(0.5)) * 2.0, 0.0);
  mask = mask * mask * mask + smoothstep(0.65, 1.0, mask);

  float alpha = vOpacity * mask;

  gl_FragColor = vec4(vColor * alpha, alpha);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}