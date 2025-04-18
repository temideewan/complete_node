
const amqp = require('amqplib');
const logger = require('./logger');

let connection = null;
let channel = null;

const EXCHANGE_NAME = 'td_sm';

async function connectToRabbitMq() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
    logger.info(`Connected to rabbit mq`);
    return channel;
  } catch (e) {
    logger.error(`Error connecting to rabbit mq : ${e}`);
  }
}

async function publishEvent(routingKey, message) {
  try {
    if (!channel) {
      await connectToRabbitMq();
    }
    channel.publish(
      EXCHANGE_NAME,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
    logger.info(`Event published ${routingKey}`);
  } catch (e) {
    logger.error(`Error Publishing event to queue routingKey: ${routingKey}. \n${e}`);
  }
}

async function consumeEvent(routingKey, callback) {
  try {
    if(!channel){
      await connectToRabbitMq();
    }
    const q = await channel.assertQueue("", {exclusive: true})
    await channel.bindQueue(q.queue, EXCHANGE_NAME, routingKey)
    channel.consume(q.queue, (msg) => {
      if(msg != null){
        const content = JSON.parse(msg.content.toString())
        callback(content);
        channel.ack(msg)
      }
    })
    logger.info(`Subscribed to event routingKey: ${routingKey}`)
  } catch (e) {
    logger.error(`Error consuming event for routingKey: ${routingKey}. \n${e}`);
    
  }
}

module.exports = { connectToRabbitMq, publishEvent, consumeEvent };
