const client = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
  try {

    const { name, email, password } = req.body

    const checkEmail = "SELECT * FROM users WHERE email=$1"

    const checkUser = await client.query(checkEmail, [email])

    if (checkUser.rows.length > 0) {
      return res.status(400).json({ msg: "User already exists" })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const saveUser = 'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email '

    const result = await client.query(saveUser, [name, email, hashPassword])

    return res.status(201).json({
      msg: "User Registred Successfully.",
      Data: result.rows[0]
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal Server Error')
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const user = result.rows[0];


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }


    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1d" }
    );

    return res.json({
      msg: "Login successful",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


module.exports = { register, login }