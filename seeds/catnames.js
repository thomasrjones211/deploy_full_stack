
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('catnames').del()
    .then(function () {
      // Inserts seed entries
      return knex('catnames').insert([
        {id: 1, name: 'bluemos'},
        {id: 2, name: 'margo'},
        {id: 3, name: 'todd'}
      ]);
    });
};
