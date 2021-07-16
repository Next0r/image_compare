const fs = require("fs");
const PNG = require("pngjs").PNG;

const readImage = (path = "") => {
  try {
    const buffer = fs.readFileSync(path);
    const png = PNG.sync.read(buffer);
    return png;
  } catch (e) {
    throw e;
  }
};

module.exports.readImage = readImage;
