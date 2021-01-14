const bcrypt = require("bcrypt");
const db = require("../../../data/dbconfig");

const authenticateUser = async (req, res, next) => {
  try {
    switch (req.method) {
      case "POST": {
        let { email, password } = req.body;
        let foundUser = await db("users").where({ email }).first();

        let verifiedPassword = await bcrypt.compare(
          password,
          foundUser.password
        );

        if (!verifiedPassword) {
          throw res.status(400).json({ message: "You shall not pass" });
        }

        req.session.user = foundUser;

        break;
      }

      case "GET": {
        req.user;
      }
      default:
        break;
    }
  } catch (error) {
    return error;
  }

  next();
};

module.exports = { authenticateUser };
