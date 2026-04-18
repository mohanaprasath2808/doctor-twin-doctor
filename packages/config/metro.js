const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

function createExpoMetroConfig(projectRoot) {
  const workspaceRoot = path.resolve(projectRoot, "../..");
  const config = getDefaultConfig(projectRoot);

  const assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
  const sourceExts = Array.from(new Set([...config.resolver.sourceExts, "svg"]));

  config.watchFolders = Array.from(
    new Set([...(config.watchFolders ?? []), workspaceRoot]),
  );

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  config.resolver = {
    ...config.resolver,
    assetExts,
    sourceExts,
    // Prefer app-local installs first so each workspace can keep its own version
    // when a dependency intentionally differs from the other apps.
    nodeModulesPaths: [
      path.resolve(projectRoot, "node_modules"),
      path.resolve(workspaceRoot, "node_modules"),
    ],
  };

  return config;
}

module.exports = createExpoMetroConfig;
