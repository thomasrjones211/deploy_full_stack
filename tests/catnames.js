const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const should = chai.should();


describe('catnames.api', () => {
  it('should return all cats', (done) => {
    api.get('/catnames')
    .expect(200)
    .end((err, res) => {
      if(err) return done(err);
      console.log(res.body);


      res.body[0].name.should.equal.a['string'];
      done();

    });
  });
  it('should post a cat name to db', (done) => {
    api.post('/catnames')
    .send({name: 'pickle'})
    .expect(200)
    //if don't care about err, then could use .expect(200, done);
    .end((err, res) => {
      if(err) return done(err);
      console.log(res.body);

  })

});
