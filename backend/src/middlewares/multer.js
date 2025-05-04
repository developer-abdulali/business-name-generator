// // import multer from "multer";

// // const storage = multer.diskStorage({
// //   filename: function (req, file, callback) {
// //     callback(null, file.originalname);
// //   },
// // });

// // const upload = multer({ storage });

// // export default upload;

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif|mp3|wav|m4a|mp4|aac/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only audio and image files are allowed!"));
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
// });

// export default upload;

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Allowed extensions
  const audioExtensions = /\.(mp3|wav|m4a|aac)$/i;
  const imageExtensions = /\.(jpe?g|png|gif)$/i;

  // Allowed mime types
  const audioMimeTypes = /^audio\//;
  const imageMimeTypes = /^image\//;

  if (file.fieldname === "audio") {
    if (
      audioExtensions.test(path.extname(file.originalname)) &&
      audioMimeTypes.test(file.mimetype)
    ) {
      return cb(null, true);
    }
    cb(new Error("Please upload audio files only (MP3, WAV, M4A, AAC)"));
  } else if (file.fieldname === "image") {
    if (
      imageExtensions.test(path.extname(file.originalname)) &&
      imageMimeTypes.test(file.mimetype)
    ) {
      return cb(null, true);
    }
    cb(new Error("Please upload image files only (JPEG, PNG, GIF)"));
  } else {
    cb(new Error("Unexpected field"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

export default upload;
