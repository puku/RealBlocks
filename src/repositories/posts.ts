import { AggregationCursor } from 'mongodb';
import { getCollection } from '../db';
import { USER_COLLECTION_NAME } from '../config/secrets';

const closestPosts = async (lat: number, lng: number): Promise<AggregationCursor> => {
    const DISTANCE = 100 * 1000; // in m

    const collection = await getCollection(USER_COLLECTION_NAME);

    return collection.aggregate([
        {
            $geoNear: {
                near: { coordinates: [lng, lat] },
                distanceField: 'address.geo',
                maxDistance: DISTANCE,
                spherical: true,
            },
        },
        {
            $lookup: {
                from: 'posts',
                localField: 'id',
                foreignField: 'userId',
                as: 'posts',
            },
        },
        {
            $unwind: '$posts',
        },
        {
            $replaceRoot: { newRoot: '$posts' },
        },
        {
            $project: { _id: 0 },
        },
    ]);
};

export default closestPosts;
