import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { apiRouter } from './routes/index.js';
import { globalErrorsHandlingMiddleware } from './middleware/index.js';
import { dbInit } from './db/dbInit.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/static', express.static('static'));
app.use('/api', apiRouter);
app.use(globalErrorsHandlingMiddleware);

dbInit()
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK. PORT: ', process.env.PORT);
});

