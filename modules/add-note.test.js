const express = require('express');
const app = express();
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('POST /note', () => {
  it('Add new note', (done) => {
    const note = {
      title: 'note1',
      description: 'description1',
    };
    chai.request(app)
      .post('/notes')
      .send(note)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});