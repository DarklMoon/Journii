async function logger(req, res, next) {
  const timestamp = new Date().toISOString().substring(0, 19);
  console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`);
  next(); //เรียกตัวต่อไป
}

const pool = require("../config");
async function isLoggedIn(req, res, next) {
  let authorization = req.headers.authorization; //ปกติต้องจะแนบ authorization มา

  if (!authorization) {
    return res.status(401).send("You are not logged in");
  }

  let [part1, part2] = authorization.split(" "); //req.headers.authorization ปกติมันจะเก็บเป็น string 'Bearer token...`
  if (part1 !== "Bearer" || !part2) {
    //หากไม่เจอให้ตีกลับ
    return res.status(401).send("You are not logged in");
  }

  // Check token
  const [tokens] = await pool.query("SELECT * FROM tokens WHERE token = ?", [
    part2,
  ]);
  const token = tokens[0];
  if (!token) {
    return res.status(401).send("You are not logged in");
  }

  // Set user
  const [users] = await pool.query(
    "SELECT id, username, first_name, last_name, email, picture, mobile, join_date, role " +
      "FROM users WHERE id = ?",
    [token.user_id]
  );
  //set เข้าไปใน req.
  req.user = users[0]; //ทุก route ต่อจากนี้ จะสามารถเข้าถึงข้อมูล user ได้หมด ไม่ต้อง querry ใหม่ทุกครั้ง

  next();
}

module.exports = {
  logger,
  isLoggedIn,
};
