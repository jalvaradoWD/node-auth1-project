const dbconfig = require("../knexfile").development;
module.exports = require("knex")(dbconfig);
