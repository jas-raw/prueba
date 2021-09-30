const request = require('supertest');
// app is supposed to point to the app.js file
const app = require('../src/index.js');

describe('Testing liveness endpoint', function () {
    it('respond with valid HTTP status code and description and message', async function (done) {
      // Make POST Request
      const response = await supertest(app).get('/liveness');

      // Compare response with expectations
      expect(response.status).toBe(200);
    });
});