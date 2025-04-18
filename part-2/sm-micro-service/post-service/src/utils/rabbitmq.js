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
    logger.error(`Error Publishing event to queue routingKey: ${routingKey}. \n${e}`);;
  }
}

module.exports = { connectToRabbitMq, publishEvent };
