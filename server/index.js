const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
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

app.get("/", (req, res) => res.send("Hello World and I am Youngil"));

app.get('/api/hello', (req,res) => {
  
  res.send("안녕 ")
})

app.post("/api/users/register", (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다!",
      });
    }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      // 비밀번호 까지 맞다면 토큰을 생성하라.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에?? 쿠키에 저장할수도 있고, 로컬스토리지에도 가능
        // 우리는 쿠키에 할거임
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기를 Authentication 이 True 라는 말.
  res.status(200).json({

    //이렇게 req.user를 할 수 있는 이유는 auth.js에서 req.user = user 를 해줬기 때문이다.
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //유저가 0이면 일반유저, 0이아니면 관리자라는 뜻
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/api/users/logout', auth, (req, res)=>{
    User.findOneAndUpdate({_id: req.user._id},
        {token:""},
        (err, user)=>{
            if(err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        })
})
app.listen(port, () => console.log(`This app is listening on port ${port}`));
