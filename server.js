const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

let db;
const url =
  "mongodb+srv://admin:asdasd12@codiee.fzkvs.mongodb.net/?retryWrites=true&w=majority&appName=codiee";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");
  })
  .catch((err) => {
    console.log(err);
  });

//라우팅
app.listen(8080);

app.get("/", (요청, 응답) => {
  // db.collection("post").insertOne({ title: "어쩌구" });
  응답.sendFile(__dirname + "/index.html");
});

app.get("/news", (요청, 응답) => {
  응답.send("오늘 비옴 ㅋㅋ");
});

app.get("/about", (요청, 응답) => {
  응답.send("난 박성현임");
});

app.get("/time", async (요청, 응답) => {
  let time = new Date();
  await db.collection("post").insertOne({ title: "시간", content: time });
});

app.get("/list", async (요청, 응답) => {
  let result = await db.collection("post").find().toArray();
  응답.render("list.ejs", { 글목록: result });
});
