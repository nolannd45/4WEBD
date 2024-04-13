import mongoose from 'mongoose';
import user from '../models/user.js';
import fs from 'fs';
mongoose.set("strictQuery", true);

export async function connect(){
  try {
    // Connecter à la base de données
    await mongoose.connect('mongodb+srv://nolannd45:XXYCiZsBRSc6kZ0t@4webd.bqkaxpj.mongodb.net/?retryWrites=true&w=majority&appName=4WEBD', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connecté à la base de données MongoDB');

    // Supprimer toutes les données existantes de la collectio
    await user.deleteMany({});
    console.log('Données existantes supprimées de la base de données');

    // Lire les données du fichier JSON
    const users = JSON.parse(fs.readFileSync('./utils/initUser.json', 'utf8'));
    // Insérer les données dans la base de données
    await user.insertMany(users);
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
