import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import makeExpressCallback from './express-callback';
import {getScores, postScore, getProductivity, renderer} from './controllers';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../static')));

app.get('/api/score', makeExpressCallback(getScores));
app.post('/api/score', makeExpressCallback(postScore));
app.get('/api/productivity', makeExpressCallback(getProductivity));

app.get('*', makeExpressCallback(renderer));

app.listen(port, () => {
  console.log('listening on port', port);
});