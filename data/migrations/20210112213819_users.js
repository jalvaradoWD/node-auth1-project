exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments().primary("user_id");

    tbl.string("email", 255).notNullable().unique();
    tbl.string("password", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
