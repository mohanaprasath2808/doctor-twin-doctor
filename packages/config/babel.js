module.exports = function createExpoBabelConfig(api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    // Reanimated’s plugin re-exports `react-native-worklets/plugin`; adding both is a duplicate.
    plugins: ["react-native-reanimated/plugin"],
  };
};
