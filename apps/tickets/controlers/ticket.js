import Ticket from "../models/ticket.js";
import * as yup from 'yup';

export async function listTicket (req, res) {
    try {
        const tickets = await Ticket.find({ idUser: req.user.id });
        console.log(tickets)
        res.status(200).send(tickets);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

  export async function createTicket(req, res) {

    const { idEvent, dateStart, dateEnd } = req.body;
    var today = new Date()
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const schema = yup.object().shape({
        idEvent: yup.string().required("besoin d'un id"),
        dateStart: yup.date().min(today,`la date requise est celle d'aujourd'hui : ${today.toDateString()}`).required("Une date de debut pour votre reservation est obligatoire"),
        dateEnd: yup.date().min(tomorrow,`il faut au moins une nuit pour reserver une chambre`).required("Une date de fin pour votre reservation est obligatoire"),
    });
    try {
        await schema.validate(req.body, { abortEarly: false }); // Permet de retourner toutes les erreurs plutôt que d'arrêter après la première
    } catch (error) {
        // Capturer l'erreur spécifique ici et la renvoyer comme réponse
        return res.status(400).send(error.errors.join(', '));
    }

    const idUser = req.user.id
    var today = new Date()

        try {
            const checkIfReserv = await Ticket.findOne({ id: idEvent, dateStart: dateStart, dateEnd: dateEnd });
            if (!checkIfReserv) {
                const newTicket = new Ticket({ idEvent, idUser, dateStart, dateEnd });
                const savedTicket = await newTicket.save();
                return res.status(201).send(savedTicket);
            } else {
                return res.status(400).send('La chambre est déjà reservé');
            }
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
};

const delTicket = async (req, res) => {
  console.log('test1')
    try {
      if (req.user.role == "admin" || req.params.id == req.user.id){
        console.log('test2')
        const removed = await Ticket.findByIdAndRemove(req.params.id);
        console.log('test3')
        console.log(removed)
        if (!removed) {
          res.sendStatus(404);
          return;
        }
        console.log('test4')
        res.status(200).send(removed);
        console.log('test5')
    }
    else{
      res.status(403).send('Vous ne disposez pas des droits pour supprimer ce ticket');
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



  
export {delTicket};