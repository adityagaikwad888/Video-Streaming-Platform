import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

const server = express();

dotenv.config();
const port = ENV_VARS.PORT;


server.use(express.json());  // allows us to parss req.body in json format
server.use("/api/v1/auth", authRoutes);

server.listen( port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
    connectDB();
})