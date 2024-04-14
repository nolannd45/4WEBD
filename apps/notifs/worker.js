import amqp from 'amqplib';

async function listenToQueue() {

    // Adresse IP et informations d'identification de RabbitMQ
    const rabbitmqHost = 'rabbitmq';
    const rabbitmqPort = 5672;
    const rabbitmqUser = 'guest';
    const rabbitmqPassword = 'guest';
    const rabbitmqVhost = '/';

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
