import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = "E:/iloveimg-compressed";
const outputDir = path.resolve("public/portfolio");

await mkdir(outputDir, { recursive: true });

const files = (await readdir(sourceDir))
  .filter((file) => /^\d+\.png$/i.test(file))
  .sort((a, b) => Number.parseInt(a) - Number.parseInt(b));

for (const file of files) {
  const source = path.join(sourceDir, file);
  const output = path.join(outputDir, file.replace(/\.png$/i, ".webp"));

  await sharp(source, { failOn: "none" })
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6, smartSubsample: true })
    .toFile(output);

  console.log(`Optimized ${file}`);
}

