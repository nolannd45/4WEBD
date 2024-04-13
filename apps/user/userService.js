import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import routeUser from './routes/routeUser.js';
import { login, logout } from './controlers/login.js';
import { connect } from './utils/mongo.js';

const app = express();
const PORT = 3001; // Port pour le service utilisateur

// Connexion à la base de données
await connect();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.post("/login", login);
app.post("/logout", logout);
app.use("/user", routeUser);

// Écoute du port
app.listen(PORT, () => {
  console.log(`Service utilisateur en cours d'exécution sur le port ${PORT}`);
});

export { app };