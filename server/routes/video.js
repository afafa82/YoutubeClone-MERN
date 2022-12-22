const express = require("express");
const router = express.Router();
// const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require("multer");

// Storage Multer Config
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // <== 202412222250_hello 이런식으로 날짜+제목이름 으로 저장됨
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    // mp4 형식의 file만 올리게 함.
    if (ext !== ".mp4") {
      return cb(res.status(400).end("Only mp4 are allowed"), false);
    }
    cb(null, true);
  },
});

//config옵션으로 만든 storage 를 아래처럼 넣음. 파일은 하나만!
const upload = multer({ storage: storage }).single("file");
//================================================================
//      Video
//================================================================
router.post("/uploadfiles", (req, res) => {
  // 비디오를 서버에 저장한다!!!
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
