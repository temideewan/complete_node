const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

// event listener for errors
client.on('error', (error) =>
  console.log(`Redis client error occurred`, error)
);

async function redisDataStructure() {
  try {
    await client.connect();
    // set, get, mset,mget
    await client.set("user:name", "Temidayo Omoyajowo")
    const name = await client.get('user:name')
    console.log(name)

    await client.mSet(['user:email', 'temideewan@gmail.com', 'user:age', "60", 'user:country', 'Nigeria'])
    const [email, age, country] = await client.mGet(['user:email', 'user:age', 'user:country'])
    console.log(email, age, country)
  } catch (e) {
    console.log(e)
  } finally {
    await client.quit()
  }
}

redisDataStructure();
