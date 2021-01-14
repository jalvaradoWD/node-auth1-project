const db = require("../../data/dbconfig");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  /**
   * FIELDS
   *
   * email - required
   * password
   */

  const { email, password: userPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    10;
    await db("users").insert({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "User created",
    });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  return res.status(200).json(await db("users").select("*"));
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let foundUser = await db("users").where({ email }).first();

    let verifiedPassword = await bcrypt.compare(password, foundUser.password);
    console.log(verifiedPassword);
    if (!verifiedPassword) {
      throw res.status(400).json({ message: "You shall not pass" });
    }

    req.session.user = foundUser;

    return res.status(200).json({
      message: "Logged in",
    });
  } catch (error) {
    return error;
  }
};

module.exports = { createUser, getUsers, loginUser };
