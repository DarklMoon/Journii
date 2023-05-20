const express = require("express");
const pool = require("../config");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token"); //Use for Generate Token
const { isLoggedIn } = require("../middlewares");

router = express.Router();

// const passwordValidator = (value, helpers) => {
//   if (value.length < 8) {
//       throw new Joi.ValidationError('Password must contain at least 8 characters')
//   }
//   if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
//       throw new Joi.ValidationError('Password must be harder')
//   }
//   return value
// }

// const usernameValidator = async (value, helpers) => {
//   const [rows, _] = await pool.query("SELECT username FROM users WHERE username = ?", [value])
//   if (rows.length > 0) {
//       const message = 'This username is already taken'
//       throw new Joi.ValidationError(message, { message })
//   }
//   return value
// }

// const signupSchema = Joi.object({
//   email: Joi.string().required().email(),
//   mobile: Joi.string().required().pattern(/0[0-9]{9}/),
//   first_name: Joi.string().required().max(150),
//   last_name: Joi.string().required().max(150),
//   password: Joi.string().required().custom(passwordValidator),
//   confirm_password: Joi.string().required().valid(Joi.ref('password')),
//   username: Joi.string().required().min(5).max(20).external(usernameValidator),
// })

router.post('/user/signup', async (req, res, next) => {
  // try {
  //   await signupSchema.validateAsync(req.body, { abortEarly: false })
  // } catch (error) {
  //   return res.status(400).json(error);
  // }

  const conn = await pool.getConnection()
  await conn.beginTransaction()

  const username = req.body.username
  // const password = await bcrypt.hash(req.body.password, 5)
  const password = req.body.password
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email = req.body.email

  try {
    await conn.query(
      'INSERT INTO user(username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)',
      [username, password, first_name, last_name, email]
    )
    conn.commit()
    res.status(201).send({
      msg: "SignUp!",
    })
  } catch (err) {
    conn.rollback()
    res.status(400).json(err.toString());
  } finally {
    conn.release()
  }
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})

router.post('/user/login', async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false })
  } catch (error) {
    return res.status(400).json(error);
  }
  console.log(req)
  const email = req.body.email
  const password = req.body.password
  console.log(email)
  console.log(password)
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    // Check if username is correct
    const [users] = await conn.query(
      'SELECT * FROM user WHERE email=?',
      [email]
    )
    const user = users[0]
    console.log(user)
    if (!user) {
      throw new Error('Incorrect username or password')
    }

    // Check if password is correct
    if (password != user.password) {
      throw new Error('Incorrect username or password')
    }

    // Check if token already existed
    // const [tokens] = await conn.query(
    //     'SELECT * FROM tokens WHERE user_id=?',
    //     [user.id]
    // )
    // let token = tokens[0]?.token
    // if (!token) {
    //     // Generate and save token into database
    //     token = generateToken()
    //     await conn.query(
    //         'INSERT INTO tokens(user_id, token) VALUES (?, ?)',
    //         [user.id, token]
    //     )
    // }

    conn.commit()
    console.log('finish')
    res.status(200).json({ 'token': 'test' })
  } catch (error) {
    conn.rollback()
    res.status(400).json(error.toString())
  } finally {
    conn.release()
  }
})

//Get Account User Or Admin
router.get("/user/:id", (req, res, next) => {

  return res.status(200).json({
    msg: `User/Admin Detail ${req.params.id}!`,
  });

});

// Path for User ?
router.get("/user/me", isLoggedIn, async (req, res, next) => {

  res.json(req.user)
});

exports.router = router;