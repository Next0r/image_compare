const fs = require("fs");
const path = require("path");

const checkName = (name = "") => {
  const nameArr = name.split(".");
  if (nameArr.pop() === "json") {
    return name;
  }
  return `${name}.json`;
};

const saveJSON = (data = {}, dirPath = "", name = "") => {
  try {
    const dataString = JSON.stringify(data, null, "\t");
    fs.writeFileSync(path.join(dirPath, checkName(name)), dataString);
  } catch (e) {
    throw e;
  }
};

module.exports.saveJSON = saveJSON;
