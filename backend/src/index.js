import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';


const app = express();


app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: false }));
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (_req, res) => res.send('API is running'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


const start = async () => {
await connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));
};
console.log('CORS allowed:', process.env.CLIENT_ORIGIN);


start();