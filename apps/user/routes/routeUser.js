import {createUser, delUser, readById, readUser, updateUser} from '../controlers/user.js';
import express from "express";
import token from "../middlewares/token.js";


const routeUser = express.Router();

routeUser.post("/create",createUser); //dont need connexion
routeUser.delete("/delete/:id",token ,delUser);//connexion + self or admin only
routeUser.get("/read",token ,readUser); //connexion + employee only
routeUser.get("/readById/:id",token ,readById); //connexion + employee only
routeUser.patch("/update/:id",token, updateUser);//connexion + self or admin only 

export default routeUser;