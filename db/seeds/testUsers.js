
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Bradf3rd', money: 500, admin: true},
        {id: 2, username: 'Test', money: 500, admin: false}
      ]);
    });
};
