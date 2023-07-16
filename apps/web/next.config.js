module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "ecs"],

  webpack: config => {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g|ttf|hdr|glb|gltf)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: "url-loader",
          options: {
            fallback: "file-loader",
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};
