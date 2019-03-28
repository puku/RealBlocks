import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}

export const MONGODB_URI: string = `${process.env.MONGODB_URI}`;
export const DATABASE_NAME: string = `${process.env.DATABASE_NAME}`;

if (!MONGODB_URI || !DATABASE_NAME) {
    process.exit(1);
}

export const USER_COLLECTION_NAME = 'users';
export const POSTS_COLLECTION_NAME = 'posts';
