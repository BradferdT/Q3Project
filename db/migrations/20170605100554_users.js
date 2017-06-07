
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('username').unique();
    table.integer('money').defaultTo(500);
    table.integer('wins').defaultTo(0);
    table.integer('losses').defaultTo(0);
    table.integer('ties').defaultTo(0);
    table.boolean('admin').defaultTo(false);
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
