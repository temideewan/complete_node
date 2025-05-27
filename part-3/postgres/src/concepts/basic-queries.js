const db = require('../db/db');

async function createUsersTable() {
  const createTableQuery = `
   CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(70) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   )
  `;

  try {
    await db.query(createTableQuery);
    console.log('Users table created successfully');
  } catch (error) {
    console.log(`Errors occurred while creating users table`, error);
  }
}

async function insertUser({ username, email, password }) {
  const insertUsersQuery = `
  INSERT INTO users (username, email, password)
  VALUES($1,$2,$3)
  RETURNING id, username, email, password`;
  try {
    const res = await db.query(insertUsersQuery, [username, email, password]);
    console.log(`User inserted successfully`, res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.log(`Errors occurred while inserting users`, error);
  }
}

async function fetchAllUsers() {
  const getAllUsersFromUsersTable = 'SELECT * FROM users';
  try {
    const res = await db.query(getAllUsersFromUsersTable);
    console.log(`Fetched all users`, res.rows);
    return res.rows;
  } catch (error) {
    console.log(`Errors occurred while fetching all users`, error);
  }
}

async function updateUserInfo(username, newEmail) {
  const updateUserQuery = `
  UPDATE users
  SET email=$2
  WHERE username=$1
  RETURNING *
  `;

  try {
    const res = await db.query(updateUserQuery, [username, newEmail]);
    if (res.rows.length > 0) {
      console.log(`User updated successfully`, res.rows[0]);
      return res.rows[0];
    } else {
      throw Error('No user with given user name');
    }
  } catch (error) {
    console.log(`Errors occurred while updating user`, error);
  }
}

async function deleteInfo(username) {
  const deleteQuery = `
  DELETE FROM users
  WHERE username=$1
  RETURNING *
  `;

  try {
    const res = await db.query(deleteQuery, [username]);
    if (res.rows.length > 0) {
      console.log(`User updated successfully`, res.rows[0]);
      return res.rows[0];
    } else {
      throw Error('No user with given user name');
    }
  } catch (error) {
    console.log(`Errors occurred while deleting user`, error);
  }
}

module.exports = {
  createUsersTable,
  insertUser,
  fetchAllUsers,
  updateUserInfo,
  deleteInfo
};
