const Redis = require("ioredis")

const redis = new Redis();

async function ioRedisDemo() {
  try {
    // await redis.connect();
    await redis.set('key','value')

    const val = await redis.get('key')
    console.log(`io redis value:`, val) 
  } catch (e) {
    console.log(e)
  } finally {
    redis.quit()
  }
}

ioRedisDemo();
