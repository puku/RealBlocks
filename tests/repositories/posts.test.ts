import * as db from '../../src/db';
import closestPosts from '../../src/repositories/posts';

// @ts-ignore
db.getCollection = jest.fn(
    async () => ({
        aggregate: async () => [1, 2, 3],
    }),
);

describe('get closest posts', () => {
    it('should create mock', () => {
        expect(jest.isMockFunction(db.getCollection)).toBeTruthy();
    });
    it('should return mocked data', async (done) => {
        expect(await closestPosts(1, 2)).toEqual([1, 2, 3]);

        done();
    });
});
