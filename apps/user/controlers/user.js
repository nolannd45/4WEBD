import User from "../models/user.js";
import bcrypt from "bcrypt";
import * as yup from 'yup';

const createUser = async (req, res) => {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      pseudo: yup.string().required(),
      password: yup.string().required()
    });

    let check = await schema.isValid(req.body)

    try {
      if (check){
        var { email, pseudo, password } = req.body;
        
        var role = "user"
        const checkIfExistPseudo = await User.findOne({ pseudo });
        const checkIfExistMail = await User.findOne({ email });
        
        if (!checkIfExistPseudo){
          if (!checkIfExistMail){  
            const saltRounds = 10;
            password = bcrypt.hashSync(password, saltRounds);

            const newUser = new User({ email, pseudo, password, role });
            const savedUser = await newUser.save();
            res.status(201).send("l'utilisateur " + savedUser.pseudo + " à bien été crée.");
          }else{res.status(409).send("l'email est deja pris");}
        
          
        }else{res.status(409).send("le pseudo est deja pris");}

        
      }
      else{
        res.status(404).send('Vous avez un problème avec un de vos attributs. Veuillez verifier que vous avez bien un email valide.');
      }
      
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };
  

  const delUser = async (req, res) => {
    try {
      if (req.user.role == "admin" || req.params.id == req.user.id){
        const removed = await User.findByIdAndRemove(req.params.id);
        if (!removed) {
          res.sendStatus(404);
          return;
        }
        res.status(200).send(removed);
      }
      else{
        res.status(403).send('Vous ne disposez pas des droits pour modifier cette personne');
      }
    } catch (error) {
      if (error.kind && error.kind === "ObjectId") {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(500);
      console.log(error);
    }
  };

  const readUser = async (req, res) => {
    try {
      if (req.user.role == "employee" || req.user.role == "admin"){
        const users = await User.find({});
        res.status(200).send(users);
      }
      else{
        res.status(403).send('vous ne disposez pas d\'un role pouvant executer cette action');
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

  const readById = async (req, res) => {
    try {
      const users = await User.findById(req.params.id);
      if (users){
        res.status(200).send(users);
      }else {res.status(409).send('l utilisateur n\'existe pas ou plus.')}
      
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };



const updateUser = async (req, res) => {
  const schema = yup.object().shape({
    email: yup.string().email(),
    pseudo: yup.string(),
    password: yup.string(),
    role: yup.string().matches(/(^admin$|^user$|^employee$)/),
  });
  let check = await schema.isValid(req.body)
  try {
    if (check){
      if (req.user.role == "admin" || req.params.id == req.user.id){
        const { email, pseudo, password, role } = req.body;
        if (req.user.role != "admin" && (role == "admin" || role == "employee")){
          res.status(403).send('Seul un admin peut vous donner les droits de devenir employee ou admin');
        } else{
          const saltRounds = 10;

          const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            email,
            pseudo,
            password: bcrypt.hashSync(password, saltRounds),
            role,
          });
          res.status(200).send(updatedUser);
        }
        
      }
      else{
        res.status(403).send('Vous ne disposez pas des droits pour modifier cette personne');
      }
    }else{
      res.status(404).send('Vous avez un problème avec un de vos attributs. Veuillez verifier que vous avez bien un email et que le role est bien parmis les roles proposés.');
    }
    
  } catch (error) {
    if (error.kind && error.kind === "ObjectId") {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(500);
  }
};
  
  export {createUser, delUser, readUser, updateUser, readById};