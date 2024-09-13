import cors from 'cors';
import 'es6-shim';
import express from 'express';
import 'reflect-metadata';

// import '@/core/configs/moment-timezone.config';
// import Database from './database/connect.database';

const app = express();
const port: number = Number(process.env.PORT) || 5000;
const whitelist = ['http://localhost:4209', 'https://service-cpms.vercel.app'];
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
// app.use(APP_PATH, rootRouter);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Database.connect()
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Listening on port ${port}`);
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     });
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
