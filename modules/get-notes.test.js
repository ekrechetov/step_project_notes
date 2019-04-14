const request = require('supertest');

describe('Main page testing', () => {
  it('Get response is 200', (done) => {
    request('http://localhost:3010')
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});