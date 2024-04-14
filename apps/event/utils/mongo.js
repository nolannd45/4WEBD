import mongoose from 'mongoose';
import event from '../models/event.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
mongoose.set("strictQuery", true);

export async function connect(){
  try {
    // Connecter à la base de données
    await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connecté à la base de données MongoDB');

    // Supprimer toutes les données existantes de la collectio
    await event.deleteMany({});
    console.log('Données existantes supprimées de la base de données');

    // Lire les données du fichier JSON
    const events = JSON.parse(fs.readFileSync('./utils/initEvent.json', 'utf8'));

    // Insérer les données dans la base de données
    await event.insertMany(events);
    console.log('Données insérées avec succès dans la base de données');
} catch (error) {
    console.error('Une erreur s\'est produite :', error);
}

};

export async function disconnect(){
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};
