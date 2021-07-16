const { manhattanCompareFunction } = require("./manhattanCompareFunction");
const { chebyshevCompareFunction } = require("./chebyshevCompareFunction");
const { eulerCompareFunction } = require("./eulerCompareFunction");

const selectCompareFunction = () => {
  let compareFunction = eulerCompareFunction;
  let maxDistance = 441.6729559;
  for (value of process.argv) {
    if (value === `-c` || value === "--chebyshev") {
      compareFunction = chebyshevCompareFunction;
      maxDistance = 255;
      break;
    } else if (value === "-m" || value === "--manhattan") {
      compareFunction = manhattanCompareFunction;
      maxDistance = 765;
      break;
    }
  }

  return { func: compareFunction, maxDistance };
};

module.exports.selectCompareFunction = selectCompareFunction;

const readComparedImageNames = () => {
  for (let i = 2; i < process.argv.length; i += 1) {
    if (process.argv[i] === "-i" || process.argv[i] === "--input") {
      if (
        !(typeof process.argv[i + 1] === "string") ||
        !(typeof process.argv[i + 2] === "string")
      ) {
        throw new Error("Invalid input image names");
      }

      return [process.argv[i + 1], process.argv[i + 2]];
    }
  }

  throw new Error("Missing input images names");
};

module.exports.readComparedImageNames = readComparedImageNames;

const readOutputName = () => {
  for (let i = 2; i < process.argv.length; i += 1) {
    if (process.argv[i] === "-o" || process.argv[i] === "--output") {
      if (!(typeof process.argv[i + 1] === "string")) {
        throw new Error("Invalid output name");
      }

      return process.argv[i + 1];
    }
  }

  throw new Error("Missing output name");
};

module.exports.readOutputName = readOutputName;
