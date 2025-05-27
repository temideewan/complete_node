const {createUsersTable, insertUser, fetchAllUsers, updateUserInfo, delet, deleteInfo} = require('./concepts/basic-queries')


// test basic queries

async function testBasicQueries() {
  try {
    // create table
    // await createUsersTable();

    // Insert users
    // await insertUser({username: 'temidayo omoyajowo', email: 'temideewan@gmail.com', password: '12345'})
    // await insertUser({username: 'Jonathan kent', email: 'jonathankent@gmail.com', password: 'failed21'})
    // await insertUser({username: 'Jonathan can', email: 'jonathancan@gmail.com', password: 'dad123'})
    // await insertUser({username: 'Clark kent', email: 'clarkkent@gmail.com', password: 'superman'})
    // await insertUser({username: 'Riszu schumacker', email: 'riszu@gmail.com', password: 'rizn1'})
    // await insertUser({username: 'Brazil', email: 'braz@gmail.com', password: 'braz123'})


    // fetch all the users
    // await fetchAllUsers();

    // update user info

    // const updatedUser = await updateUserInfo('temidayo omoyajowo', 'temife@email.com')
    // console.log(updatedUser)

    const deletedUser = await deleteInfo('temidayo omoyajowo')
    console.log(deletedUser)
  } catch (error) {
    console.log(`Error: `, error)
  }
}

async function runAllQueries() {
  await testBasicQueries();
}

runAllQueries();
