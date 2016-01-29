'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;

const app = require('../app');
const User = require('../model/User');
chai.use(chaiHttp);
const agent = chai.request.agent(app);

const mongoose = require('mongoose');




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
      .redirects(0)
      .end((err, res) => {
        expect(res).to.redirectTo('/login');
        expect(err).to.be.null;
        done();
      });
  });

  it('should successfully register testing and get redicted to home page', done => {
    agent
      .post('/register')
      .send({username: 'testing', password: 'test'})
      .redirects(0)
      .then((res) => {
        expect(res).to.have.status(302);
        expect(res).to.redirectTo('/');
        done();
      })
      .catch(done);
  });

  it('should succesfully login and get redirected to home page', done => {
    agent
      .post('/login')
      .send({username: 'testing', password: 'test'})
      .redirects(0)
      .then( (res) => {
        expect(res).to.have.status(302);
        expect(res).to.redirectTo('/');
        done();
      })
      .catch(done);
  });

});
