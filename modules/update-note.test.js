const express = require('express');
const app = express();
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('GET /note', () => {
  it('View note with db', (done) => {
    chai.request(app)
      .get('/notes/5cb2042d4f1f1f2d1433bcae')
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
