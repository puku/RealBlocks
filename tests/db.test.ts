import * as db from '../src/db';

const getClient = jest.fn(
    async () => ({
        db: () => ({
            collection: async (name: string) => name,
        }),
    }),
);

// @ts-ignore
db.getClient = getClient;

describe('db connection', () => {
    it('should create mock', () => {
        expect(jest.isMockFunction(db.getClient)).toBeTruthy();
    });
    it('should return mocked data', async (done) => {
        expect(await db.getCollection('test')).toEqual('test');
        expect(getClient.mock.calls.length).toBe(1);
        done();
    });
});
