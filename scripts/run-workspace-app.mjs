import { spawnSync } from "node:child_process";

const [, , command, appName, ...extraArgs] = process.argv;

const workspaces = {
  doctor: "@doctor-twin/doctor",
  patient: "@doctor-twin/patient",
  staff: "@doctor-twin/staff",
};

if (!command || !appName || !workspaces[appName]) {
  console.error(
    [
      "Usage:",
      "  npm run start -- <doctor|patient|staff> [extra Expo args]",
      "  npm run ios -- <doctor|patient|staff> [extra Expo args]",
      "  npm run android -- <doctor|patient|staff> [extra Expo args]",
    ].join("\n"),
  );
  process.exit(1);
}

const result = spawnSync(
  "npm",
  ["--workspace", workspaces[appName], "run", command, "--", ...extraArgs],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  },
);

process.exit(result.status ?? 1);
