import * as validation from 'express-validator/check';
import { postsProximity } from '../../src/controllers/posts';
import app from '../../src/app';

jest.mock('../../src/repositories/posts', () => async (lat: number, lng: number) => ({
    toArray: async () => ({
        lat,
        lng,
    }),
}));

// @ts-ignore
validation.validationResult = jest.fn(() => ({
    isEmpty: () => false,
}));

describe('test proximity', () => {
    it('check controller behavior', async (done) => {
        app.request.body = { geo: { lat: 23, lng: 17 } };

        const mock = jest.spyOn(app.response, 'json');
        // @ts-ignore
        mock.mockImplementation(async res => res);

        const res = await postsProximity(app.request, app.response);
        expect(res).toEqual({ data: { lat: 23, lng: 17 } });
        done();
    });
});
