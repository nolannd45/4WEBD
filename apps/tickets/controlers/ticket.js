import Ticket from "../models/ticket.js";
import * as yup from 'yup';
import amqp from 'amqplib';

async function sendMessageToRabbitMQ(message, id) {
  try {
    // Adresse IP et informations d'identification de RabbitMQ
    const rabbitmqHost = 'rabbitmq';
    const rabbitmqPort = 5672;
    const rabbitmqUser = 'guest';
    const rabbitmqPassword = 'guest';
    const rabbitmqVhost = '/';

    // Création de la connexion
    const connection = await amqp.connect(`amqp://${rabbitmqUser}:${rabbitmqPassword}@${rabbitmqHost}:${rabbitmqPort}/${rabbitmqVhost}`);

    // Création du canal
    const channel = await connection.createChannel();

    // Déclaration de l'échange
    const exchangeName = 'envoi email achat event n°' + id;
    await channel.assertExchange(exchangeName, 'direct', { durable: true });

    // Envoi du message
    const routingKey = 'email';
    channel.publish(exchangeName, routingKey, Buffer.from(message));

    console.log(`Message envoyé à RabbitMQ: ${message}`);

    // Fermeture de la connexion
    await connection.close();
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'envoi du message à RabbitMQ :', error);
  }
}

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

    const { idEvent } = req.body;

    const schema = yup.object().shape({
        idEvent: yup.string().required("besoin d'un id d'event"),
      });
    try {
        await schema.validate(req.body, { abortEarly: false }); // Permet de retourner toutes les erreurs plutôt que d'arrêter après la première
    } catch (error) {
        // Capturer l'erreur spécifique ici et la renvoyer comme réponse
        return res.status(400).send(error.errors.join(', '));
    }

    const idUser = req.user.id

        try {
            const checkIfReserv = await Ticket.findOne({ id: idEvent });
            if (!checkIfReserv) {
                const newTicket = new Ticket({ idEvent, idUser });
                const savedTicket = await newTicket.save();
                sendMessageToRabbitMQ("ticket is been buy", idEvent)
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