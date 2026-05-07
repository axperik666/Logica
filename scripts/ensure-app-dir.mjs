import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const checks = [
  ["app", path.join(root, "app")],
  ["src/app", path.join(root, "src", "app")],
  ["pages", path.join(root, "pages")],
  ["src/pages", path.join(root, "src", "pages")]
];

const found = checks.filter(([, full]) => fs.existsSync(full));
if (found.length === 0) {
  console.error(
    "[ensure-app-dir] В корне проекта нет ни app/, ни src/app/, ни pages/.\n" +
      `Ожидаемый корень (где лежит package.json): ${root}\n` +
      "На хостинге задайте «Корень проекта» на эту папку и закоммитьте файлы из Git."
  );
  process.exit(1);
}

console.log(
  "[ensure-app-dir] OK:",
  found.map(([name]) => name).join(", ")
);
