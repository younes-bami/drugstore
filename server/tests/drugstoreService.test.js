// tests/drugstoreService.test.js
const supertest = require('supertest');
const app = require('../server'); // Import your Express app
const { getDrugstores } = require('../services/drugstoreService');

const request = supertest(app);

// Start the server on a different port for testing
beforeAll(() => {
    app.listen(3002);
  });

describe('Drugstore Service', () => {
  it('should fetch drugstores', async () => {
    const response = await request.get('/api/drugstores');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
