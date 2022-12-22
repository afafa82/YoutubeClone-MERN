const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

// application/x-www-form-urlencoded 이런 url 로 된 주소를 해석해준다.
// 나중에 입력한 데이터가 올바르게 입력되었을 때 postman에서 extended: true 가 출력된다.
app.use(bodyParser.urlencoded({ extended: true }));

// application/json json형식으로 된 내용을 해석해준다.
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//================================================================
//          Video Router
//================================================================
app.use("/api/video", require("./routes/video")); // <=api/video 를 해놨기 때문에 video.js에서 /api/video 를 안써줘도 됨.

//================================================================
//          User Router
//================================================================
app.use('/api/users', require('./routes/users'));


//Port 어디에서 나오고 있는지 확인!
app.listen(port, () => console.log(`This app is listening on port ${port}`));
