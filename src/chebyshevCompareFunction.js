const chebyshevCompareFunction = (rgba1 = [], rgba2 = []) => {
  if (rgba1.length !== rgba2.length) {
    throw new Error("Color vectors have different length");
  }

  let max = Math.abs(rgba1[0] - rgba2[0]);
  for (let i = 1; i < rgba1.length; i += 1) {
    const a = Math.abs(rgba1[i] - rgba2[i]);
    if (a > max) {
      max = a;
    }
  }

  return max;
};

module.exports.chebyshevCompareFunction = chebyshevCompareFunction;
