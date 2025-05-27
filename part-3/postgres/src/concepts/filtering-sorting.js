const db = require('../db/db');

// where clause

async function getUsersWhere(condition) {
  const getUsersQuery = `
  SELECT * FROM users
  WHERE ${condition}
  `

  try {
    const res = await db.query(getUsersQuery,)
    return res.rows
  } catch (error) {
    console.log(`Errors fetching users`, error);
  }
}

async function getSortedUsers(column = "created_at", order='ASC') { 
 const getSortedUserQuery = `
  SELECT * FROM users
  ORDER BY ${column} ${order}
  `

  try {
    const res = await db.query(getSortedUserQuery,)
    return res.rows
  } catch (error) {
    console.log(`Errors fetching sorted users`, error);
  } 
}

async function getPaginatedUsers(limit=10, offset) {
  const getPaginatedQuery = `
  SELECT * FROM USERS
  LIMIT $1 OFFSET $2
  `

  try {
    const res = await db.query(getPaginatedQuery, [limit,offset])
    return res.rows;
  } catch (error) {
    console.log(`Errors fetching sorted users`, error);
  }
}
module.exports = {getUsersWhere, getSortedUsers, getPaginatedUsers}


