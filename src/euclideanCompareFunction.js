const euclideanCompareFunction = (rgba1 = [], rgba2 = []) => {
  if (rgba1.length !== rgba2.length) {
    throw new Error("Color vectors have different length");
  }

  const squareDiffArray = [];
  for (let i = 0; i < rgba1.length; i += 1) {
    squareDiffArray.push((rgba1[i] - rgba2[i]) * (rgba1[i] - rgba2[i]));
  }

  return Math.sqrt(squareDiffArray.reduce((p, c) => p + c));
};

module.exports.euclideanCompareFunction = euclideanCompareFunction;
