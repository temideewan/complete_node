const { countPostByUser, averagePostsPerUser } = require('./concepts/aggregation');
const {
  createUsersTable,
  insertUser,
  fetchAllUsers,
  updateUserInfo,
  delet,
  deleteInfo,
} = require('./concepts/basic-queries');
const {
  getUsersWhere,
  getSortedUsers,
  getPaginatedUsers,
} = require('./concepts/filtering-sorting');
const {
  getUsersWithPosts,
  getAllUsersAndTheirPosts,
} = require('./concepts/joins');
const { createPostTable, insertNewPost } = require('./concepts/relationships');

// test basic queries

async function testBasicQueries() {
  try {
    // create table
    // await createUsersTable();

    // Insert users
    await insertUser({
      username: 'temidayo omoyajowo',
      email: 'temideewan@gmail.com',
      password: '12345',
    });
    await insertUser({
      username: 'Jonathan kent',
      email: 'jonathankent@gmail.com',
      password: 'failed21',
    });
    await insertUser({
      username: 'Jonathan can',
      email: 'jonathancan@gmail.com',
      password: 'dad123',
    });
    await insertUser({
      username: 'Clark kent',
      email: 'clarkkent@gmail.com',
      password: 'superman',
    });
    await insertUser({
      username: 'Riszu schumacker',
      email: 'riszu@gmail.com',
      password: 'rizn1',
    });
    await insertUser({
      username: 'Gravins zerksez',
      email: 'serks@gmail.com',
      password: 'zerkses',
    });

    // fetch all the users
    await fetchAllUsers();

    // update user info
    const updatedUser = await updateUserInfo(
      'temidayo omoyajowo',
      'temife@email.com'
    );
    console.log(updatedUser);

    // delete user info
    const deletedUser = await deleteInfo('temidayo omoyajowo');
    console.log(deletedUser);
  } catch (error) {
    console.log(`Error: `, error);
  }
}

async function testFilterAndSortQueries() {
  try {
    // get users with username starting with t
    // const tFilteredUsers = await getUsersWhere("username ILIKE 'j%'")
    // console.log(tFilteredUsers)

    // get all sorted users
    // const sortedUsers = await getSortedUsers('username', 'DESC');

    // get paginated users
    const paginatedUsers = await getPaginatedUsers(2, 1);
    console.log(paginatedUsers);
  } catch (error) {
    console.log(`Error: `, error);
  }
}
async function testRelationshipQueries() {
  try {
    // await createPostTable();
    await insertNewPost(
      'An interesting intro to postgres second',
      'This is the most interesting post on postgres so far. It handles you understanding a number of things- First revision',
      3
    );
    await insertNewPost(
      'An interesting intro to postgres third',
      'This is the most interesting post on postgres so far. It handles you understanding a number of things- Second revision',
      5
    );
    await insertNewPost(
      'An interesting intro to postgres fourth',
      'This is the most interesting post on postgres so far. It handles you understanding a number of things- Third revision',
      13
    );
  } catch (error) {
    console.log(`Error: `, error);
  }
}
async function testJoinQueries() {
  try {
    // const userWithPost = await getUsersWithPosts();
    // console.log(userWithPost);

    const allUsersAndTheirPosts = await getAllUsersAndTheirPosts();
    console.log(allUsersAndTheirPosts);
  } catch (error) {
    console.log(`Error: `, error);
  }
}

async function testAggregateQueries() {
  try {
    const averagePosts = await averagePostsPerUser();
    console.log(averagePosts);
    // const postCount = await countPostByUser();
    // console.log(postCount);
  } catch (error) {
    console.log(`Error: `, error);
  }
}
async function runAllQueries() {
  // await testBasicQueries();
  // await testFilterAndSortQueries();
  // await testRelationshipQueries();
  // await testJoinQueries();
  await testAggregateQueries();
}

runAllQueries();
