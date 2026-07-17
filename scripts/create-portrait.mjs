import sharp from "sharp";

await sharp("E:/iloveimg-compressed/0.png")
  .extract({ left: 165, top: 278, width: 350, height: 482 })
  .webp({ quality: 90, effort: 6, smartSubsample: true })
  .toFile("public/portrait.webp");

