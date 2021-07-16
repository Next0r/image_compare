const PNG = require("pngjs").PNG;
const fs = require("fs");
const path = require("path");

const checkName = (name = "") => {
  const nameArr = name.trim().split(".");
  if (nameArr.pop() !== "png") {
    return `${name}.png`;
  }
  return name;
};

const writeImageBW = (
  width = 1280,
  height = 720,
  data = [],
  dirPath = "",
  name = ""
) => {
  if (width * height !== data.length) {
    throw new Error("Width and height do not match data size");
  }

  if (data.length < 1) {
    throw new Error("Data array cannot be empty");
  }

  try {
    const png = new PNG({ colorType: 0, width: width, height: height });
    png.data = data;
    const buffer = PNG.sync.write(png, {
      width: width,
      height: height,
      colorType: 6,
      inputColorType: 0,
    });
    fs.writeFileSync(path.join(dirPath, checkName(name)), buffer);
  } catch (e) {
    throw e;
  }
};

module.exports.writeImageBW = writeImageBW;
