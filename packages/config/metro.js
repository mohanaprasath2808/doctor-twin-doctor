const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

function createExpoMetroConfig(projectRoot) {
  const workspaceRoot = path.resolve(projectRoot, "../..");
  const config = getDefaultConfig(projectRoot);

  const assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
  const sourceExts = Array.from(new Set([...config.resolver.sourceExts, "svg"]));

  config.watchFolders = Array.from(new Set([...(config.watchFolders ?? []), workspaceRoot]));

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  config.resolver = {
    ...config.resolver,
    assetExts,
    sourceExts,
    // Prefer hoisted workspace deps; use app-local node_modules only as fallback.
    // Root first: native modules (e.g. react-native-safe-area-context) must resolve
    // to a single copy or iOS/Android can hit "register two views with the same name".
    nodeModulesPaths: [
      path.resolve(workspaceRoot, "node_modules"),
      path.resolve(projectRoot, "node_modules"),
    ],
  };

  return config;
}

module.exports = createExpoMetroConfig;
