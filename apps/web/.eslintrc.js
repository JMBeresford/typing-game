module.exports = {
  root: true,
  extends: ["custom"],
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        message:
          "Don't use `performance.now()`, instead use the in-built clock from the global store object.",
        selector: "CallExpression[callee.object.name='performance'][callee.property.name='now']",
      },
    ],
  },
};
