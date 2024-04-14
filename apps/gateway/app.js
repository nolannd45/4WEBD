import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const port = 3005;

// Middleware pour analyser les corps de requête au format JSON
app.use(express.json());

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(cookieParser());

const portRegistry = {
    user: 3001,
    event: 3002,
    ticket: 3003
    // Ajoutez d'autres microservices avec leurs ports correspondants
};

// Endpoint de proxy pour rediriger les requêtes vers les microservices
app.all('/api/:service/*', async (req, res) => {
    try {
        const { service } = req.params;
        const { method, originalUrl, body, headers } = req;

        // Extrait le token d'authentification du header de la requête
        const token = headers.authorization ? headers.authorization.replace('Bearer ', '') : '';

        // Construit l'URL de l'API cible en fonction du service et de l'URL d'origine de la requête
        const url = `http://${service}:${portRegistry[service]}${originalUrl.replace('/api', '')}`;

        // Envoie la requête à l'API cible en incluant le token d'authentification dans les en-têtes
        const response = await axios({
            method,
            url,
            data: body,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Renvoie la réponse de l'API cible au frontend
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Erreur lors de la redirection de la requête:', error.message);
        res.status(500).send('Erreur lors de la redirection de la requête');
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Passerelle de microservices en cours d'exécution sur le port ${port}`);
});
