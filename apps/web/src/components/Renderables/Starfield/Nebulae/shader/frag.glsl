#define COLOR_COUNT 3

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform float uTime;
uniform float uVelocity;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTextureWarp1;
uniform vec2 uResolution;

varying vec2 vUv;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: blendLighten = require(glsl-blend/lighten)

mat2 rotate2d(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

vec3 getColor(vec2 st) {
  vec3 c = uColor1;
  float t = uTime * 0.0015;
  vec3 colors[] = vec3[](uColor2, uColor3, uColor4);
  vec2 st1 = (st * 3.0 + texture2D(uTexture1, (st * 10.0) + t).rg * 0.1) * 1.85;
  vec2 st2 = (st + texture2D(uTexture2, st + t * 5.0).rg * 0.1) * 0.095;

  #pragma unroll_loop
  for (int i = 0; i < COLOR_COUNT; i++) {
    float speed = 0.25 + float(i) * 0.125;
    float sign = mod(float(i), 2.0) * 1.0;
    vec2 scaledSt1 = st1 * float(i + 1) * 1.25 * speed * sign;
    vec2 scaledSt2 = st2 * float(i + 1) * 1.25 * -speed * sign;
    vec2 offset = st + speed * t * float(i + 1);

    float n1 = texture2D(uTexture1, scaledSt1 + offset).r / float(COLOR_COUNT);
    float n2 = texture2D(uTexture2, scaledSt2 + offset).r / float(COLOR_COUNT);
    float n = n1 + n2;
    n = smoothstep(0.05, 0.5, n) + smoothstep(0.2, 0.3, n) + smoothstep(0.25, 0.275, n) * 5.0;

    c = c + colors[i] * n;
  }

  return c;
}

vec3 getWarpColor(vec2 st) {

  vec3 c = uColor1;
  float t = uTime * 0.001;
  vec2 colorSt = st * 0.2;
  vec3 colors[] = vec3[](uColor2, uColor3, uColor4);

  #pragma unroll_loop
  for (int i = 0; i < COLOR_COUNT; i++) {
    float sign = mod(float(i), 2.0) * -1.0;
    vec2 warpSt = st;
    warpSt -= 0.5;

    float aspect1 = uResolution.x / uResolution.y;
    float aspect2 = 1.0 / aspect1;
    warpSt /= max(aspect1, aspect2);

    warpSt = warpSt * rotate2d(t * sign);
    warpSt += 0.5;

    float streak = texture2D(uTextureWarp1, warpSt).r;
    streak *= pow(distance(st, vec2(0.5)) * 3.0, 1.5);
    float speed = 5.0 + float(i) * 0.3;
    float flow = 3.0 + float(i) * 0.3;

    float n = abs(snoise3(vec3(colorSt.x + t * 0.25 * flow, colorSt.y + t * 0.1 * flow, t * 0.025 * speed)));

    c += colors[i] * n * streak;
  }

  return c;
}

void main() {
  vec3 color = getColor(vUv);

  vec2 warpSt = gl_FragCoord.xy / uResolution.xy;
  vec3 warpColor = getWarpColor(warpSt);

  color = mix(color, warpColor, uVelocity);

  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
}