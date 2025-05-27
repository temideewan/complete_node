const {createUsersTable, insertUser, fetchAllUsers, updateUserInfo, delet, deleteInfo} = require('./concepts/basic-queries');
const { getUsersWhere, getSortedUsers, getPaginatedUsers } = require('./concepts/filtering-sorting');


// test basic queries

async function testBasicQueries() {
  try {
    // create table
    // await createUsersTable();

    // Insert users
    await insertUser({username: 'temidayo omoyajowo', email: 'temideewan@gmail.com', password: '12345'})
    await insertUser({username: 'Jonathan kent', email: 'jonathankent@gmail.com', password: 'failed21'})
    await insertUser({username: 'Jonathan can', email: 'jonathancan@gmail.com', password: 'dad123'})
    await insertUser({username: 'Clark kent', email: 'clarkkent@gmail.com', password: 'superman'})
    await insertUser({username: 'Riszu schumacker', email: 'riszu@gmail.com', password: 'rizn1'})
    await insertUser({username: 'Gravins zerksez', email: 'serks@gmail.com', password: 'zerkses'})


    // fetch all the users
    await fetchAllUsers();

    // update user info
    const updatedUser = await updateUserInfo('temidayo omoyajowo', 'temife@email.com')
    console.log(updatedUser)
    
    // delete user info
    const deletedUser = await deleteInfo('temidayo omoyajowo')
    console.log(deletedUser)
  } catch (error) {
    console.log(`Error: `, error)
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
  const paginatedUsers = await getPaginatedUsers(2, 1)
  console.log(paginatedUsers)
 } catch (error) {
    console.log(`Error: `, error)
  } 
}
async function runAllQueries() {
  // await testBasicQueries();
  await testFilterAndSortQueries();
}

runAllQueries();
