import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1180",
  database: "messenger",
});

app.use(express.json());
app.use(cors());

app.listen(8800, () => {
  console.log("백엔드랑 연결되었다!");
});

app.get("/", (req, res) => {
  res.json("안뇽 여기는 백엔드");
});

// messages 테이블 값 가져와보기
app.get("/messages", (req, res) => {
  const q = "select * from messages";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// message테이블에 post요청하기(메시지 생성)
app.post("/messages", (req, res) => {
  const q = "INSERT INTO messages (`content`, `password`) VALUES (?)";
  const values = [req.body.content, req.body.password];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// delete 기능구현
app.delete("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const q = " DELETE FROM messages WHERE id = ? ";

  db.query(q, [messageId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// update(수정)기능구현
app.put("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const q = "update messages set `content` = ?, `password` = ? where id = ?";

  const values = [req.body.content, req.body.password];

  db.query(q, [...values, messageId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Message has been updated successfully");
  });
});
