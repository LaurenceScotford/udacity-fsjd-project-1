import request from 'supertest';
import app from '../index';

describe('App', () => {
  it('returns a 200 status', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((error) => (error ? done.fail(error) : done()));
  });
});
