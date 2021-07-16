/**
 * @param {number[]} differenceArray
 * @param {number} maxDifference
 * @param {number} maxValue
 */
const computeDifferenceStats = (
  differenceArray = [],
  maxDifference = 441.6729599, // max difference as euler distance between [0,0,0,255] and [255,255,255,255]
  maxValue = 255
) => {
  if (differenceArray.length < 1) {
    throw new Error("Difference array must contain at least one element");
  }

  const maxScaled = [];
  const normalized = [];
  const maxValueNormalized = [];
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

    maxScaled.push(element / maxDifference);
    oneScaled.push(element / maxValue);
    sum += element;
  }

  const average = sum / differenceArray.length;
  const averageOneScaled = average / maxDifference;
  let stdDev = 0;
  const maxOneScaled = max / maxDifference;
  const minOneScaled = min / maxDifference;

  for (element of differenceArray) {
    normalized.push(element / max);
    maxValueNormalized.push(normalized[normalized.length - 1] * maxValue);
    stdDev += (element - average) * (element - average);
  }

  stdDev = Math.sqrt(stdDev / (differenceArray.length - 1));
  const stdDevOneScaled = stdDev / maxDifference;

  return {
    vectors: {
      maxScaled,
      oneScaled,
      normalized,
      maxValueNormalized,
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
