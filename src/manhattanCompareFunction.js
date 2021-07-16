const manhattanCompareFunction = (rgba1 = [], rgba2 = []) => {
  if (rgba1.length !== rgba2.length) {
    throw new Error("Color vectors have different length");
  }

  let sum = 0;
  for (let i = 0; i < rgba1.length; i += 1) {
    sum += Math.abs(rgba1[i] - rgba2[i]);
  }

  return sum;
};

module.exports.manhattanCompareFunction = manhattanCompareFunction;
