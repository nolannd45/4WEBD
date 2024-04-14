import {createEvent, delEvent, addCount, remCount, readEventId, updateEvent , readEventSorted} from '../controlers/event.js';
import express from "express";
import token from "../middlewares/token.js";
import adminAuth from "../middlewares/adminAuth.js";


const routeEvent = express.Router();

routeEvent.post("/create",[token,adminAuth] ,createEvent);//connexion + admin only
routeEvent.delete("/delete/:id",[token,adminAuth],delEvent);//connexion + admin only
routeEvent.get("/this/:id", readEventId);//dont need connexion
routeEvent.get("/read", readEventSorted);//dont need connexion
routeEvent.patch("/update/:id",[token,adminAuth],updateEvent);//connexion + admin only
routeEvent.patch("/addCount/:id",[token],addCount);//connexion
routeEvent.patch("/remCount/:id",[token],remCount);//connexion

export default routeEvent;