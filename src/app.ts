import express, { Request, Response } from 'express';
import { config } from 'dotenv';
config();
const PORT = process.env.PORT;
const app = express()

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: true, 
        message: 'welcome to woven...'
    })
});



app.listen(3000, () => {
    console.log(`server now live at port ${PORT}`)
})