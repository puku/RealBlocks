import { Db, Collection } from 'mongodb';
import fs from 'fs';
import { getClient } from '../src/db';
import { POSTS_COLLECTION_NAME } from '../src/config/secrets';

const createCollection = async (
    db: Db,
): Promise<Collection> => db.createCollection(POSTS_COLLECTION_NAME, {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: [
                'userId',
                'id',
                'title',
                'body',
            ],
            properties: {
                userId: {
                    bsonType: 'int',
                    description: 'must be a int and is required',
                },
                id: {
                    bsonType: 'int',
                    description: 'must be a int and is required',
                },
                title: {
                    bsonType: 'string',
                    description: 'must be a string and is not required',
                },
                body: {
                    bsonType: 'string',
                    description: 'must be a string and is not required',
                },
            },
        },
    },
    validationAction: 'error',
    validationLevel: 'strict',
});

module.exports.up = async () => {
    const mongoClient = await getClient();
    const collection = await createCollection(mongoClient.db());
    const posts = JSON.parse(fs.readFileSync('./data/fixtures/posts.json', 'utf8'));
    await collection.insertMany(posts);
};

module.exports.down = async () => {
    const mongoClient = await getClient();
    await mongoClient.db().dropCollection(POSTS_COLLECTION_NAME);
};
