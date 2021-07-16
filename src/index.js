const path = require("path");

const { readImage } = require("./readImage");
const { compareImages } = require("./compareImages");
const { computeDifferenceStats } = require("./computeDifferenceStats");
const { writeImageBW } = require("./writeImage");
const { saveJSON } = require("./saveJSON");

const main = () => {
  const resPath = path.join(__dirname, "..", "res");
  const outPath = path.join(__dirname, "..", "out");

  const png1 = readImage(path.join(resPath, "01.png"));
  const png2 = readImage(path.join(resPath, "02.png"));
  // const png3 = readImage(path.join(resPath, "glass_opt_02.png"));

  let differenceArray = compareImages(png1, png2);
  const stats = computeDifferenceStats(differenceArray);
  writeImageBW(
    png1.width,
    png2.height,
    new Uint8Array(stats.vectors.maxValueNormalized),
    outPath,
    "test"
  );
  saveJSON(stats.scalars, outPath, "test");

  console.log();
};

try {
  main();
} catch (e) {
  console.error(e.stack);
}
