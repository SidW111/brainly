import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { contentModel, shareModel, userModel } from "./db";
import { userMiddleware } from "./middleware";
import cors from 'cors';
const JWT_PASS = "SID@2003";
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb+srv://admin:Sid2003@cluster0.wbqhie2.mongodb.net/brainly")
  .then(() => console.log("connected"));

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //const hashedPass = bcrypt.hash(password,10)

  try {
    await userModel.create({
      username: username,
      password: password,
    });

    res.status(200).json({
      msg: "user signed up",
    });
  } catch (error) {
    res.status(411).json({
      msg: "user already exist",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userModel.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, JWT_PASS);
    res.json({ token: token });
  } else {
    res.status(403).json({
      msg: "Incorrect Credentials",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const title = req.body.title;
  const link = req.body.link;
  const userId = req.body.userId;

  const result = await contentModel.create({
    title: title,
    link: link,
    type: req.body.type,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });

  if (result) {
    res.status(200).json({
      msg: "content added successfully",
    });
  } else {
    res.status(403).json({
      msg: "problem",
    });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const user = req.userId;
  const content = await contentModel
    .find({
      userId: user,
    })
    .populate("userId", "username");

  res.json({ content });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  // @ts-ignore
  const contentId = req.body.contentId;
  const del = await contentModel.deleteOne({
    contentId: contentId,
    //@ts-ignore
    userId: req.userId,
  });

  res.json({
    msg: "content deleted Successfully",
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const { share } = req.body;
  if (share) {
    const existingLink = await shareModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    console.log("hii from share");
    const newHash = Math.random().toString(16);
    await shareModel.create({
      hash: newHash,
      //@ts-ignore
      userId: req.userId,
    });
    res.json({
      newHash,
      msg: "link created succesfully",
    });
  } else {
    await shareModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });

    res.json({ msg: "link removed successfully" });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await shareModel.findOne({ hash });
  //res.json({link})
  if (!link) {
    res.status(400).json({
      msg: "Invalid share link",
    });
  }
  const content = await contentModel.find({
    //@ts-ignore
    userId: link.userId,
  });
  const user = await userModel.findOne({
    //@ts-ignore
    _id: link.userId,
  });
  console.log(user);
  if (!user) {
    res.status(404).json({ message: "User not found" }); // Handle missing user case.
    return;
  }

  res.status(200).json({
    //@ts-ignore
    user: user.username,
    content,
  });
});

app.listen(3000);
