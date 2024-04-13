import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import routeEvent from './routes/routeEvent.js';
import { connect } from './utils/mongo.js';

const app = express();
const PORT = 3002; // Port pour le service hôtel

// Connexion à la base de données
await connect();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/Event", routeEvent);

// Écoute du port
app.listen(PORT, () => {
  console.log(`Service d'event en cours d'exécution sur le port ${PORT}`);
});

export { app };
