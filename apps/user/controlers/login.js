import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {

  try {
    const { pseudo, password } = req.body;
    // Valider les données d'entrée
    if (!pseudo || !password) {
      return res.status(404).send('Veuillez fournir un nom d\'utilisateur et un mot de passe');
    }

    // Vérifier les informations d'identification de l'utilisateur dans la base de données a
    const user = await User.findOne({ pseudo });
    if (!user) {
      return res.status(404).send('L\'utilisateur souhaité n\'existe pas');
    }

    // Vérifier le mot de passe
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).send('Mot de passe incorrect');
    }

    // Générer un jeton JWT
    const token = jwt.sign({
      id: user._id,
      pseudo: user.pseudo,
      role: user.role
    }, 'config', { expiresIn: '1y' });
    res.cookie('token', token);


    res.status(200).json({
      token,
      user
    });
    
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).send('logout')
};

export {login,logout};