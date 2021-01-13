const db = require("../../data/dbconfig");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  /**
   * FIELDS
   *
   * email - required
   * password
   */

  const { email, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    await db("users").insert({
      ...req.body,
      password: hashedPassword,
    });

    res.session.user = email;

    return res.status(200).json({
      message: "User created",
    });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  return db("users").select("*");
};

const loginUser = async (req, res) => {
  return res.status(200).json({
    message: "Logged in",
  });
};

module.exports = { createUser, getUsers, loginUser };
