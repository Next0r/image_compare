/**
 * @param {number[]} differenceArray
 * @param {number} maxDifference
 * @param {number} maxValue
 */
const createDifferenceStats = (
  differenceArray = [],
  maxDifference = 510,
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
  let stdDev = 0;
  const maxOneScaled = max / maxDifference;
  const minOneScaled = min / maxDifference;

  for (element of differenceArray) {
    normalized.push(element / max);
    maxValueNormalized.push(normalized[normalized.length - 1] * maxValue);
    stdDev += (element - average) * (element - average);
  }

  stdDev = Math.sqrt(stdDev / (differenceArray.length - 1));

  return {
    maxScaled,
    oneScaled,
    normalized,
    maxValueNormalized,
    min,
    max,
    maxOneScaled,
    minOneScaled,
    sum,
    average,
    stdDev,
  };
};

module.exports.createDifferenceStats = createDifferenceStats;
