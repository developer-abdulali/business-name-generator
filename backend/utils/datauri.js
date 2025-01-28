// import DataUriParser from "datauri/parser.js";
// import path from "path";

// const getDataUri = (file) => {
//   const parser = new DataUriParser();
//   const extName = path.extname(file.originalname).toString();
//   return parser.format(extName, file.buffer);
// };

// export default getDataUri;

const getDataUri = (file) => {
  const path = require("path");
  const DataURIParser = require("datauri/parser");
  const parser = new DataURIParser();

  return parser.format(path.extname(file.originalname).toString(), file.buffer);
};
export default getDataUri;
