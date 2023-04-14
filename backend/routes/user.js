const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

// 유저 생성 (post 요청)
// 위 함수도 데이터베이스와 통신하기 때문에 async로 작성해야 됨.
router.post("/", async (req, res) => {
  try {
    const { account } = req.body;

    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });
    console.log(existUser);
    if (existUser) {
      return res
        .status(400)
        .json({ ok: false, error: "Already exist Account." });
    }

    const user = await client.user.create({
      data: {
        account,
      },
      // 위의 existUser를 추가하기 전에도 const user가 실행은 됐었음. 생성은 안되지만! 그래서 id값을 소모해서 건너뛴거임
    });

    res.json({ ok: true, user });
  } catch (error) {
    console.error(error);
  }
});

// 유저 조회
router.get("/:account", async (req, res) => {
  try {
    const { account } = req.params;

    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "Not exist User.",
      });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
