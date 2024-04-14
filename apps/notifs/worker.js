import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

async function listenToQueue() {

    // Adresse IP et informations d'identification de RabbitMQ
    const rabbitmqHost = process.env.RABBITMQ_HOST;
    const rabbitmqPort = process.env.RABBITMQ_PORT;
    const rabbitmqUser = process.env.RABBITMQ_USER;
    const rabbitmqPassword = process.env.RABBITMQ_PASSWORD;
    const rabbitmqVhost = process.env.RABBITMQ_VHOST;

    // Création de la connexion
    const connection = await amqp.connect(`amqp://${rabbitmqUser}:${rabbitmqPassword}@${rabbitmqHost}:${rabbitmqPort}/${rabbitmqVhost}`);
    const channel = await connection.createChannel();
    const queueName = "email";
    const exchangeName = "myExchange"; // Nom de votre échange
  
    // Déclaration de la file d'attente
    await channel.assertQueue(queueName, { durable: false });
  
    console.log("Le worker écoute les messages de l'échange...");

    // Déclaration de l'échange
    await channel.assertExchange(exchangeName, 'fanout', { durable: true });
  
    // Lier la file d'attente à l'échange spécifique
    await channel.bindQueue(queueName, exchangeName, '');
  
    // Consommer les messages de la file d'attente
    channel.consume(queueName, (message) => {
      if (message !== null) {
        console.log("Message reçu:", message.content.toString());
        channel.ack(message);
      }
    });
  
    // Attente indéfinie pour maintenir le worker en cours d'exécution
    await new Promise(() => {});
}

// Exemple d'utilisation
listenToQueue().catch(console.error);
