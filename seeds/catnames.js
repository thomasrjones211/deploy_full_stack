
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('catnames').del()
    .then(function () {
      // Inserts seed entries
      return knex('catnames').insert([
        {name: 'bluemos'},
        {name: 'margo'},
        {name: 'todd'}
      ]);
    });
};
