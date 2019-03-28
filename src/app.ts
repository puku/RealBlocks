import express from 'express';
import bodyParser from 'body-parser';
import { postProximityInputValidators, postsProximity } from './controllers/posts';

// Creating application
const app = express();

// Configuration application
app.set('port', process.env.PORT);
app.use(bodyParser.json());

// Define routing
app.post(
    '/posts/proximity',
    postProximityInputValidators,
    postsProximity,
);

export default app;
