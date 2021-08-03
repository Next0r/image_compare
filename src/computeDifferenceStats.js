/**
 * @param {number[]} differenceArray
 * @param {number} maxDifference
 * @param {number} maxValue
 */
const computeDifferenceStats = (
  differenceArray = [],
  maxDifference = 441.6729599 // max difference as euclidean distance between [0,0,0,255] and [255,255,255,255]
) => {
  if (differenceArray.length < 1) {
    throw new Error("Difference array must contain at least one element");
  }

  const normalized = [];
  const oneScaled = [];
  let sum = 0;

  let max = differenceArray[0];
  let min = differenceArray[0];

  for (element of differenceArray) {
    if (element > max) {
      max = element;
    } else if (element < min) {
      min = element;
    }

    oneScaled.push(element / maxDifference);
    sum += element;
  }

  const average = sum / differenceArray.length;
  const averageOneScaled = average / maxDifference;
  let stdDev = 0;
  const maxOneScaled = max / maxDifference;
  const minOneScaled = min / maxDifference;

  for (element of differenceArray) {
    normalized.push(element / max);
    stdDev += (element - average) * (element - average);
  }

  stdDev = Math.sqrt(stdDev / (differenceArray.length - 1));
  const stdDevOneScaled = stdDev / maxDifference;

  return {
    vectors: {
      oneScaled,
      normalized,
    },
    scalars: {
      min,
      max,
      maxOneScaled,
      minOneScaled,
      sum,
      average,
      averageOneScaled,
      stdDev,
      stdDevOneScaled,
    },
  };
};

module.exports.computeDifferenceStats = computeDifferenceStats;
