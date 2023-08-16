module.exports = {
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "no-console": "error",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
