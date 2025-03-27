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

async function redisDataStructure() {
  try {
    await client.connect();
    // set, get, mset,mget
    // await client.set('user:name', 'Temidayo Omoyajowo');
    // const name = await client.get('user:name');
    // console.log(name);
    // // mset -> accept arrays and ach two consecutive item define a key and value pair to each other
    // await client.mSet([
    //   'user:email',
    //   'temideewan@gmail.com',
    //   'user:age',
    //   '60',
    //   'user:country',
    //   'Nigeria',
    // ]);
    // const [email, age, country] = await client.mGet([
    //   'user:email',
    //   'user:age',
    //   'user:country',
    // ]);
    // console.log(email, age, country);
    // await client.del('notes');
    // // list -> LPUSH, RPUSH, LRANGE, LPOP, RPOP
    // await client.lPush('notes', ['note 1', 'note 2', 'note 3']);
    // // lRange receives a range. to get all items use a range of 0 -> -1
    // const extractAllNotes = await client.lRange('notes', 0, -1);
    // console.log(extractAllNotes);
    // const lastNote = await client.rPop('notes');
    // console.log(lastNote);
    // const remainingNotes = await client.lRange('notes', 0, -1);
    // console.log(remainingNotes);

    // sets -> sAdd, sMembers, sIsMembers, sRem
    // await client.sAdd('user:nickname', ['john', 'temidayo', 'xyz']);
    // const extractUserNicknames = await client.sMembers('user:nickname');
    // console.log(extractUserNicknames);
    // const isTemiUserNickname = await client.sIsMember('user:nickname', 'xyz');
    // console.log(isTemiUserNickname);

    // await client.sRem('user:nickname', 'xyz');
    // const updatedNames = await client.sMembers('user:nickname');
    // console.log(updatedNames);

    // sorted sets
    // zAdd, zRange, zRank
    // await client.zAdd('cart', [
    //   {
    //     score: 100,
    //     value: 'Cart 1',
    //   },
    //   {
    //     score: 150,
    //     value: 'Cart 2',
    //   },
    //   {
    //     score: 10,
    //     value: 'Cart 3',
    //   },
    // ]);
    // const getTopCartItems = await client.zRange('cart', 0, -1);
    // console.log(getTopCartItems)

    // const extractAllCartItemsWithScores = await client.zRangeWithScores('cart', 0, -1);
    // console.log(extractAllCartItemsWithScores)
    // const cartTwoRank = await client.zRank('cart', 'Cart 2')
    // console.log(cartTwoRank)

    // hashes -> hGet, hSet, hGetAll, hDel
    await client.hSet('product:1', {
      name: 'Product 1',
      description: 'product one description',
      rating: "5"
    })
    const getRating = await client.hGet('product:1', 'rating');
    console.log(getRating)

    const getProductDetails = await client.hGetAll("product:1")
    console.log(getProductDetails)
    
    await client.hDel('product:1', 'rating');
    const newProductDetails = await client.hGetAll("product:1")
    console.log(newProductDetails)
  } catch (e) {
    console.log(e);
  } finally {
    await client.quit();
  }
}

redisDataStructure();
