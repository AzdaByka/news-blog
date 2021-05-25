import express from 'express'
import {createConnection} from 'typeorm'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import log4js from 'log4js'
import cors from 'cors'
import morgan from 'morgan'
import BaseRouter from './routes/index';


createConnection();
dotenv.config();
let logger = log4js.getLogger()
logger.level = process.env.LOG_LEVEL


const app = express();
const port = process.env.PORT;




/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));
app.use('/api', BaseRouter)


app.listen(port, () =>console.log(`Running on port ${port}`))

