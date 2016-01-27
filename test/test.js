'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;

const app = require('../app');
const User = require('../model/User');

const mongoose = require('mongoose');



chai.use(chaiHttp);

describe('Session Authentication', () => {

  before( done => {
    const db = mongoose.connection;
    mongoose.connect('mongodb://localhost/test');
    db.once('open', () => {
      User.remove({"username": "testing"}, () => {
        done();
      });
    });
    db.on( 'error', err => {
      console.log( 'db connect error!', err);
      db.close();
      done(err);
    });
  });

  it('should redirect unauthenticated user back to GET /login', done => {
    chai
      .request(app)
      .get('/employees')
      .end((err, res) => {
        assert.equal(res.req.path, '/login');
        done();
      });
  });

  it('should successfully register testing and get redicted to home page', done => {
    chai
      .request(app)
      .post('/register')
      .send({username: 'testing', password: 'test'})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.req.path).to.equal('/');
        done();
      });
  });

  it('should succesfully login and get redirected to home page', done => {
    chai
      .request(app)
      .post('/login')
      .send({username: 'testing', password: 'test'})
      .end( (err, res) => {
        var redirect = res.redirects[0].split('/');
        var path = redirect[redirect.length-1];
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.req.path).to.equal('/');
        done();
      });
  });

});
