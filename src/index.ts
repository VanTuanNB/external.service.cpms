import cors from 'cors';
import 'es6-shim';
import express from 'express';
import 'reflect-metadata';

import '@/core/configs/app.config';
import '@/core/configs/moment-timezone.config';
import { APP_PATH } from '@/core/constants/common.constant';
import Database from '@/database/connect.database';
import rootRouter from '@/routes/index.route';

const app = express();
const port: number = Number(process.env.PORT) || 5000;
const whitelist = [
    'http://localhost:3000',
    'https://external-portal-client-cpms.vercel.app',
    'https://external-portal-admin-cpms.vercel.app',
    'http://localhost:5173',
    'https://service-cpms.vercel.app',
];
app.use(
    cors((req, callback) => {
        const corsOptions = { origin: false };
        if (whitelist.indexOf(req.header('Origin') ?? '') !== -1) {
            corsOptions.origin = true;
        } else {
            corsOptions.origin = false;
        }
        callback(null, {
            ...corsOptions,
            methods: ['GET', 'HEAD', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
        });
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/test', (req, res) => {
    return res.json(process.env || {});
});
app.use(APP_PATH, rootRouter);

Database.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
