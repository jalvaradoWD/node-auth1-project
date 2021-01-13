const bcrypt = require("bcrypt");
const db = require("../../../data/dbconfig");

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await db("users").where({ email });

    const verifiedPassword = await bcrypt.compare(
      password,
      foundUser[0].password
    );

    if (!verifiedPassword) {
      throw res.status(400).json({ message: "You shall not pass" });
    }
  } catch (error) {
    return error;
  }

  next();
};

module.exports = { authenticateUser };
