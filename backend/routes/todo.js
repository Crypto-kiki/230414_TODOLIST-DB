const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

// todo 생성
router.post("/", async (req, res) => {
  try {
    const { todo, userId } = req.body;
    if (!todo) {
      return res.status(400).json({ ok: false, error: "Not exist todo." });
    }
    if (!userId) {
      return res.status(400).json({ ok: false, error: "Not exist userId" });
    }
    /* if (!todo || !userId) {
      return res.status(400).json({ ok: false, error: "Not exist todo." });
    }   위처럼 해도 됨*/

    // 유저정보(데이터)가 user라는 변수에 담긴거임.
    const user = await client.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "Not exist user.",
      });
    }

    const newTodo = await client.todo.create({
      data: {
        todo,
        isDone: false,
        userId: user.id,
      },
    });

    res.json({ ok: true, todo: newTodo });
  } catch (error) {
    console.error(error);
  }
});

// todo 조회
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await client.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "Not exist user." });
    }

    const todos = await client.todo.findMany({
      where: {
        userId: parseFloat(userId),
      },
      // // 클라이언트가 보내는거임. 로그인하면 0번을 줌.
      // skip: 6,
      // // 3개씩 보내는 거임.
      // take: 3,
    });

    console.log(todos);

    res.json({ ok: true, todos });
  } catch (error) {
    console.error(error);
  }
});

// todo 완료
router.put("/:id/done", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTodo = await client.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isDone: false,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// todo 삭제

module.exports = router;
