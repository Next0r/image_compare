const path = require("path");

const { readImage } = require("./readImage");
const { compareImages } = require("./compareImages");
const { computeDifferenceStats } = require("./computeDifferenceStats");
const { writeImageBW } = require("./writeImage");
const { saveJSON } = require("./saveJSON");
const { manhattanCompareFunction } = require("./manhattanCompareFunction");
const { chebyshevCompareFunction } = require("./chebyshevCompareFunction");

const main = () => {
  const resPath = path.join(__dirname, "..", "res");
  const outPath = path.join(__dirname, "..", "out");

  const png1 = readImage(path.join(resPath, "01.png"));
  const png2 = readImage(path.join(resPath, "glass_opt_02.png"));
  // const png3 = readImage(path.join(resPath, "glass_opt_02.png"));

  // const differenceArray = compareImages(png1, png2);
  // const stats = computeDifferenceStats(differenceArray);

  // const differenceArray = compareImages(png1, png2, manhattanCompareFunction);
  // const stats = computeDifferenceStats(differenceArray, 765);

  const differenceArray = compareImages(png1, png2, chebyshevCompareFunction);
  const stats = computeDifferenceStats(differenceArray, 255);

  writeImageBW(
    png1.width,
    png2.height,
    new Uint8Array(stats.vectors.normalized.map((value) => value * 255)),
    outPath,
    "test5"
  );
  saveJSON(stats.scalars, outPath, "test5");

  console.log();
};

try {
  main();
} catch (e) {
  console.error(e.stack);
}
