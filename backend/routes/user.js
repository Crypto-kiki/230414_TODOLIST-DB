const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

// 유저 생성 (post 요청)
// 위 함수도 데이터베이스와 통신하기 때문에 async로 작성해야 됨.
router.post("/", async (req, res) => {
  try {
    const { account } = req.body;

    const user = await client.user.create({
      data: {
        account,
      },
    });

    res.json({ ok: true, user });
  } catch (error) {
    console.error(error);
  }
});

// 유저 조회

module.exports = router;
