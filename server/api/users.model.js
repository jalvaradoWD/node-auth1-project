const db = require("../../data/dbconfig");
const bcrypt = require("bycrypt");

const createUser = async (req, res) => {
  /**
   * FIELDS
   *
   * email - required
   * password
   */

  try {
    const results = await db("users").insert(req.body);
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async (req, res) => {};

module.exports = {};
