// const http = require('http');
import request from 'supertest';
import app from '../app.js';
// const { expect } = require('chai');
import {expect} from 'chai';
import db from "../models/connection_db.js";

let valid_username = "testuser@gmail.com";
let valid_password = "testpass1234";

before(async () => {
    // Clean up the test user
    db.execute('DELETE FROM accounts WHERE user_name = ?', [valid_username]);
    // Close the connection
});

after(async () => {
    // Clean up the test user
    db.execute('DELETE FROM accounts WHERE user_name = ?', [valid_username]);
    // Close the connection
    db.end();
});




describe('Member API Endpoints', () => {
    it('should create new member', done => {
        request(app)
            .post('/register')
            .send({ username: valid_username, email: valid_username, hash_password: valid_password }) // Example payload
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('result');
                const result = res.body.result;
                // Check the specific values
                expect(result).to.include({
                    status: '註冊成功。',
                });

                expect(result.registerMember).to.include({
                    user_name: valid_username,
                    email: valid_username,
                });

                // Additional check for hash_password to ensure it exists and is a string
                expect(result.registerMember).to.have.property('hash_password').that.is.a('string');

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