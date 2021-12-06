const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./assets",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
