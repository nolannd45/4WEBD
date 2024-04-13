import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import routeTicket from './routes/routeTicket.js';
import { connect } from './utils/mongo.js';

const app = express();
const PORT = 3003; // Port pour le service billets

// Connexion à la base de données
await connect();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/ticket", routeTicket);

// Écoute du port
app.listen(PORT, () => {
  console.log(`Service billets en cours d'exécution sur le port ${PORT}`);
});

export { app };
