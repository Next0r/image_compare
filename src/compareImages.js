const { PNG } = require("pngjs");
const { eulerCompareFunction } = require("./eulerCompareFunction");

/**
 * @callback compareFunction
 * @param {number[]} rgba1
 * @param {number[]} rgba2
 * @returns {number} difference
 */

/**
 * @param {PNG} image1
 * @param {PNG} image2
 * @param {compareFunction} compareFunction
 */
const compareImages = (
  image1,
  image2,
  compareFunction = eulerCompareFunction
) => {
  const buffer1 = new Uint8Array(image1.data);
  const buffer2 = new Uint8Array(image2.data);

  if (buffer1.length !== buffer2.length) {
    throw new Error("Images have different size");
  }

  const differenceArray = [];

  for (let i = 0; i < buffer1.length; i += 4) {
    const rgba1 = [buffer1[i], buffer1[i + 1], buffer1[i + 2], buffer1[i + 3]];
    const rgba2 = [buffer2[i], buffer2[i + 1], buffer2[i + 2], buffer2[i + 3]];

    differenceArray.push(compareFunction(rgba1, rgba2));
  }

  return differenceArray;
};

module.exports.compareImages = compareImages;
