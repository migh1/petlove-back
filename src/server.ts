import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const server = app.listen(3333);

export default server;
