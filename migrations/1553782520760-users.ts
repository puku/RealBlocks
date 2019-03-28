import { Db, Collection } from 'mongodb';
import fs from 'fs';
import { getClient } from '../src/db';
import { User } from '../src/types/user';
import { USER_COLLECTION_NAME } from '../src/config/secrets';

const createCollection = async (
    db: Db,
): Promise<Collection> => db.createCollection(
    USER_COLLECTION_NAME, {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [
                    'id',
                    'name',
                    'username',
                    'email',
                    'address.street',
                    'address.suite',
                    'address.city',
                    'address.zipcode',
                    'address.geo',
                    'phone',
                    'website',
                    'company.name',
                    'company.catchPhrase',
                    'company.bs',
                ],
                properties: {
                    id: {
                        bsonType: 'int',
                        description: 'must be a int and is required',
                    },
                    name: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    username: {
                        bsonType: 'string',
                        description: 'must be a string and is not required',
                    },
                    email: {
                        bsonType: 'string',
                        description: 'must be a string and is not required',
                    },
                    'address.street': {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    'address.suite': {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    'address.city': {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    'address.zipcode': {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    'address.geo': {
                        bsonType: 'array',
                        description: 'must be an array of double and is required',
                    },
                    phone: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    website: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    'company.name': {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    'company.catchPhrase': {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    'company.bs': {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                },
            },
        },
        validationAction: 'error',
        validationLevel: 'strict',
    },
);

module.exports.up = async () => {
    const mongoClient = await getClient();
    const collection = await createCollection(mongoClient.db());
    await collection.createIndex({ 'address.geo': '2dsphere' });
    const users = JSON.parse(fs.readFileSync('./data/fixtures/users.json', 'utf8'));
    users.forEach((user: User) => {
        const { lat, lng } = user.address.geo;

        collection.insertOne({
            ...user,
            address: { geo: [parseFloat(lng), parseFloat(lat)] },
        });
    });
};

module.exports.down = async () => {
    const mongoClient = await getClient();
    await mongoClient.db().dropCollection(USER_COLLECTION_NAME);
};
