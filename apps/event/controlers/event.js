import Event from "../models/event.js";
import * as yup from 'yup';

export async function createEvent(req, res) {
  const { name, location, description, picture_list } = req.body;
  if (req.user.role == "admin"){
    const schema = yup.object().shape({
      name: yup.string().required(),
      location: yup.string().required(),
      description: yup.string().required(),
      picture_list: yup.array().required(),
    });
    let check = await schema.isValid(req.body)

    const checkIfExistName = await Event.findOne({ name });

    if (!checkIfExistName){
      try {
        if (check){
        const newEvent = new Event({ name, location, description, picture_list });
        const savedEvent = await newEvent.save();
        res.status(201).send(savedEvent);
        }
        else{
          res.status(400).send('Vous avez un problème avec un de vos attributs. Veuillez les verifier');
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {res.status(409).send('l event existe deja')};
  }else{
    res.status(403).send('Vous ne disposez pas des droits pour modifier cet hôtel');
  }
};

export async function delEvent(req, res){
    try {
      const removed = await Event.findByIdAndRemove(req.params.id);
      if (!removed) {
        res.sendStatus(404);
        return;
      }
      res.status(200).send(removed);
    } catch (error) {
      if (error.kind && error.kind === "ObjectId") {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(500);
      console.log(error);
    }
};

export async function readEvent (req, res){
    try {
      const events = await Event.find({});
      res.status(200).send(events);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
};

export async function readEventId(req, res){
  try {
    const events = await Event.findById(req.params.id);
    if (events){
      res.status(200).send(events);
    }else {res.status(409).send('l event n\'existe pas ou plus.')}
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


export async function updateEvent(req, res){
  const schema = yup.object().shape({
    name: yup.string(),
    location: yup.string(),
    description: yup.string(),
    picture_list: yup.array(),
  });
  let check = await schema.isValid(req.body)
  
    try {
      if (check){
        const { name, location, description, picture_list } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
          name,
          location,
          description,
          picture_list,
        });
        res.status(200).send(updatedEvent);
      }
      else{
        res.status(400).send('Vous avez un problème avec un de vos attributs. Veuillez les verifier');
      }
    } catch (error) {
      if (error.kind && error.kind === "ObjectId") {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(500);
    }
};

export async function readEventSorted (req, res){
  try {
    const events = await Event.find().sort({name : 1});
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};