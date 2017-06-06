
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('username').unique();
    table.integer('money').defaultTo(500);
    table.specificType('deck', 'text[]');
    table.boolean('admin').defaultTo(false);
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
