const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");

const app = express();

const port = 3010;

app.use(cors());
// express().use(cors()); 이렇게 해도 됨. 하지만 보통 관행적으로 app을 씀. 변수명을 파일명으로 할 필요는 없지만 관행임.
app.use(express.json());

app.use("/user", userRouter);
// /user에 접속하면 userRouter를 사용해라.

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server listening on port : ${port} 🦉`);
});
