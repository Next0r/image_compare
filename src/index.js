const path = require("path");

const { readImage } = require("./readImage");
const { compareImages } = require("./compareImages");
const { computeDifferenceStats } = require("./computeDifferenceStats");
const { writeImageBW } = require("./writeImage");
const { saveJSON } = require("./saveJSON");
const {
  selectCompareFunction,
  readComparedImageNames,
  readOutputName,
  helpRequest,
  printHelp,
} = require("./processManagement");

const main = () => {
  const didRequestHelp = helpRequest();
  if (didRequestHelp) {
    printHelp();
    return;
  }

  const compareFunction = selectCompareFunction();
  const imageNames = readComparedImageNames();
  const outputName = readOutputName();
  const resPath = path.join(__dirname, "..", "res");
  const outPath = path.join(__dirname, "..", "out");

  const img1 = readImage(path.join(resPath, imageNames[0]));
  const img2 = readImage(path.join(resPath, imageNames[1]));

  const differenceArray = compareImages(img1, img2, compareFunction.func);
  const stats = computeDifferenceStats(differenceArray, compareFunction.maxDistance);

  writeImageBW(
    img1.width,
    img2.height,
    new Uint8Array(stats.vectors.normalized.map((value) => value * 255)),
    outPath,
    outputName
  );
  saveJSON(stats.scalars, outPath, `${outputName}_stats`);
  console.log("Done");
};

try {
  main();
} catch (e) {
  // console.error(e.stack);
  console.log(e.message);
}
