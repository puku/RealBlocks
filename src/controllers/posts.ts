import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator/check';
import closestPosts from '../repositories/posts';

export const postProximityInputValidators = [
    check('geo.lng').isFloat({ min: -180, max: 180 }),
    check('geo.lat').isFloat({ min: -90, max: 90 }),
];

/**
 * POST /posts/proximity
 * Get closest user posts
 */
export const postsProximity = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { lat, lng } = req.body.geo;

    const posts = await closestPosts(
        parseFloat(lat),
        parseFloat(lng),
    );

    return res.json({
        data: await posts.toArray(),
    });
};
