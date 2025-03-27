// pub/ sub

const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});
client.on('connect', () => {
  console.log('Redis has connected successfully');
});
// event listener for errors
client.on('error', (error) =>
  console.log(`Redis client error occurred`, error)
);

async function testAdditionalFeatures() {
  try {
    await client.connect();

    // const subscriber = client.duplicate(); // create a new client but shares the same connection
    // await subscriber.connect(); // connect to redis for the subscriber

    // await subscriber.subscribe('dummy-channel', (message, channel) => {
    //   console.log(`Received message from ${channel}: ${message}`);
    // });

    // // now publish message to subscriber
    // await client.publish('dummy-channel', 'Some dummy data from publisher');
    // await client.publish('dummy-channel', 'Another message from the publisher');

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // await subscriber.quit(); //close the subscriber connection

    //  pipelining & transactions
    const multi = client.multi();

    multi.set('key-transaction1', 'value1');
    multi.set('key-transaction2', 'value2');
    multi.get('key-transaction1');
    multi.get('key-transaction2');

    const results = await multi.exec();
    console.log(results);

    const pipeline = client.multi();
    multi.set('key-pipeline1', 'value1');
    multi.set('key-pipeline2', 'value2');
    multi.get('key-pipeline1');
    multi.get('key-pipeline2');
    const pipelineResult = await pipeline.exec();
    console.log(pipelineResult);

    // batch data operation

    const pipelineOne = client.multi();
    for (let i = 0; i < 1000; i++) {
      pipeline.set(`user:${1}:action`, `Action ${i}`);
    }
    await pipelineOne.exec();

    const dummy = client.multi();
    multi.decrBy('account:1234:balance', 100);
    multi.incrBy('account:000:balance', 100);

    await dummy.exec();
  } catch (e) {
    console.log(e);
  } finally {
    await client.quit();
  }
}

testAdditionalFeatures();
