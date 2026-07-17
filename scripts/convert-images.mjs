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
  const image = sharp(source, { failOn: "none" });
  const metadata = await image.metadata();
  const output = path.join(outputDir, file.replace(/\.png$/i, ".webp"));

  await image
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(output);

  console.log(`${file}: ${metadata.width}x${metadata.height}`);
}

