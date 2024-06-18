const http = require('http');
const request = require('supertest');
const app = require('../app');




let valid_username = "testuser@gmail.com";
let valid_password = "testpass1234";

describe('Member API Endpoints', () => {
    it('should create new member', done => {
        request(app)
            .post('/register')
            .send({ username: valid_username, email: valid_username, hash_password: valid_password }) // Example payload
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                console.log(res)
                done();
            });
    });

    it('should fail to login with incorrect password', done => {
        request(app)
            .post('/login')
            .send({ username: valid_username, email: valid_username, hash_password: 'wrongpass' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should login as a member', done => {
        request(app)
            .post('/login')
            .send({ username: valid_username, email: valid_username, hash_password: valid_password })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});