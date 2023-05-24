import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Post CRUD

// Create post
router.post("/", async (req, res) => {
  const { content, image, tag, poll } = req.body;
  // @ts-ignore
  const user = req.user;
  const { id } = user;

  try {
    const result = await prisma.post.create({
      data: {
        content,
        image,
        tag,
        poll: {
          create: {
            options: {
              create: poll.options.map((option: any) => ({
                option: option.option,
              })),
            },
            question: poll.question,
            participants: poll.participants,
            allowMultiple: poll.allowMultiple,
          },
        },
        title: "title",
        user: {
          connect: { id: id },
        },
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// list post
router.get("/home", async (req, res) => {
  const allPosts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      poll: true,
      _count: {
        select: { comments: true },
      },
    },
  });
  res.json(allPosts);
});

// list popular post
router.get("/popular", async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        poll: true,
        _count: {
          select: { comments: true },
        },
      },
      orderBy: [
        {
          likes: "desc",
        },
        {
          comments: {
            _count: "desc",
          },
        },
      ],
    });
    res.json(allPosts);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// get one post
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        user: true,
        comments: true,
        poll: {
          include: {
            options: true,
          },
        },
        _count: true,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "post not found!" });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({ where: { id: id } });
  res.sendStatus(200);
});

// Like post
router.put("/like/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// Unlike post

// view post
router.put("/view/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.update({
      where: { id: id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

export default router;
