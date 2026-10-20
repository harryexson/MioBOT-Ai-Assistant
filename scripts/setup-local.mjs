import fs from "node:fs";
import { spawnSync } from "node:child_process";
const manifest = JSON.parse(
  fs.readFileSync(new URL("../package.local.json", import.meta.url), "utf8"),
);
const packages = Object.entries(manifest.dependencies).map(
  ([name, version]) => `${name}@${version}`,
);
const args = ["install", "--no-save", "--package-lock=false", ...packages];
const result = spawnSync(
  process.platform === "win32" ? "npm.cmd" : "npm",
  args,
  { stdio: "inherit", shell: process.platform === "win32" },
);
process.exit(result.status ?? 1);
