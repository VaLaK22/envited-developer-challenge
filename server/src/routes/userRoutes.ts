import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// User CRUD

// Create user
router.post("/", async (req, res) => {
  const { email, name, username } = req.body;

  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
      },
    });

    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// list users
router.get("/", async (req, res) => {
  const allUser = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  res.json(allUser);
});

// get one user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: { posts: true },
  });

  res.json(user);
});

// update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;

  try {
    const result = await prisma.user.update({
      where: { id: id },
      data: { name },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: `Failed to update the user` });
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: id } });
  res.sendStatus(200);
});

export default router;
