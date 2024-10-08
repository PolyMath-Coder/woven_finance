import express, { Request, Response } from 'express';

import { config } from 'dotenv';
import { databaseConnection } from './config/models';
import allRoutes from './routes/routes';
config();
const PORT = process.env.PORT;
const app = express()

app.use(express.json());

app.use('/api', allRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: true, 
        message: 'welcome to woven...'
    })
});



app.listen(3001, async () => {
    await databaseConnection()
    console.log(`server now live at port ${PORT}`)
})