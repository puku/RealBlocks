import request from 'supertest';
import app from '../src/app';

// avoid jest open handle error
afterAll(async () => {
    await new Promise(r => setTimeout(r, 500));
});

describe('GET /random-url', () => {
    it('should return 404', (done) => {
        request(app).get('/random-url').expect(404, done);
    });
});

describe('POST /posts/proximity', () => {
    it('should return 422, because empty post', async (done) => {
        const response = await request(app)
            .post('/posts/proximity')
            .expect(422);
        expect(response.body).toEqual({
            errors: [
                {
                    location: 'body',
                    param: 'geo.lng',
                    msg: 'Invalid value',
                },
                {
                    location: 'body',
                    param: 'geo.lat',
                    msg: 'Invalid value',
                },
            ],
        });
        done();
    });
    it('should return 422, invalid lng', (done) => {
        request(app).post('/posts/proximity')
            .set('Accept', 'application/json')
            .send({ geo: { lat: 1 } })
            .expect(422, done);
    });
});
