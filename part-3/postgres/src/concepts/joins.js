const db = require('../db/db');

async function getUsersWithPosts() {
  const getUsersWithPostQuery = `
  SELECT users.id, users.username, posts.title
  FROM users
  INNER JOIN posts ON users.id = posts.user_id
  `;

  try {
    const res = await db.query(getUsersWithPostQuery)
    return res.rows[0];
  } catch (error) {
    console.log(error)
  }
}

async function getAllUsersAndTheirPosts() {
  const query = `
  SELECT users.id, users.username, posts.title
  FROM users
  LEFT JOIN posts ON users.id = posts.user_id
  `
 try {
    const res = await db.query(query)
    return res.rows;
  } catch (error) {
    console.log(error)
  }}

module.exports = {
  getUsersWithPosts,
  getAllUsersAndTheirPosts
}
