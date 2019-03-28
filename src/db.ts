import mongodb, { Collection, MongoClient } from 'mongodb';

import { MONGODB_URI } from './config/secrets';

const mongoClient = mongodb.MongoClient;

export const getClient = async (): Promise<MongoClient> => mongoClient.connect(
    MONGODB_URI,
    { useNewUrlParser: true },
);

export const getCollection = async (
    collectionName: string,
): Promise<Collection> => {
    const client: MongoClient = await getClient();

    return client.db().collection(collectionName);
};
