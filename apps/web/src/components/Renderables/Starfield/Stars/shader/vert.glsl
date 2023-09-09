#define RANGE 20.0
#define MIN_RAY_LEN 0.25
#define MAX_RAY_LEN 2.0
#define MIN_STRETCH 0.0
#define MAX_STRETCH 2.0
#define MIN_THICKNESS 0.0
#define MAX_THICKNESS 0.05
#define COLORS vec3[](vec3(1), vec3(1, 0.85, 0.9), vec3(0.95, 0.8, 1))

uniform float uTime;
uniform float uVelocity;

attribute float aCorner;
attribute float aColor;

varying vec2 vUv;
varying vec3 vColor;
varying float vOpacity;

float remap(float value, float low1, float high1, float low2, float high2) {
  return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

void main() {
  vec3 pos = position;

  pos.z += uTime * 0.1;
  pos.z = mod(pos.z, RANGE) - RANGE * 0.5;

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);
  vec4 modelPosOrigin = modelPos;
  vec4 projPosOrigin = projectionMatrix * viewMatrix * modelPosOrigin;

  float globalSizeFactor = clamp(remap(projPosOrigin.z, RANGE, RANGE * 0.9, 0.0, 1.0), 0.0, 1.0);
  float rayLength = remap(uVelocity, 0.0, 1.0, MIN_RAY_LEN, MAX_RAY_LEN);
  float stretchFactor = remap(uVelocity, 0.0, 1.0, MIN_STRETCH, MAX_STRETCH);

  if (aCorner == 3.0 || aCorner == 1.0) {
    modelPos.z -= (rayLength * stretchFactor * globalSizeFactor);
  }

  if (aCorner == 0.0 || aCorner == 2.0) {
    modelPos.z += (rayLength * stretchFactor * globalSizeFactor);
  }

  vec4 viewPos = viewMatrix * modelPos;

  float size = 0.2 * globalSizeFactor;
  float thickness = remap(uVelocity, 0.0, 1.0, MIN_THICKNESS, MAX_THICKNESS);
  float verticalStretch = mix(size, thickness, stretchFactor);
  float angle = atan(-modelPosOrigin.y, -modelPosOrigin.x);

  if (aCorner == 0.0) {
    viewPos.xy += rotate(vec2(-size, -verticalStretch), angle);
  }

  if (aCorner == 1.0) {
    viewPos.xy += rotate(vec2(size, -verticalStretch), angle);
  }

  if (aCorner == 2.0) {
    viewPos.xy += rotate(vec2(-size, verticalStretch), angle);
  }

  if (aCorner == 3.0) {
    viewPos.xy += rotate(vec2(size, verticalStretch), angle);
  }

  vec4 projPosition = projectionMatrix * viewPos;

  gl_Position = projPosition;

  vUv = uv;
  vColor = COLORS[int(aColor)];
  vOpacity = 2.0 / distance(modelPos.xyz, cameraPosition);
}