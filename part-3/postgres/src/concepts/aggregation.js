const db = require('../db/db');

async function countPostByUser() {
  const countPostByUserQuery = `
  SELECT users.username, COUNT(posts.id) AS post_count
  FROM users
  LEFT JOIN posts ON users.id = posts.user_id
  GROUP BY users.id, users.username
  `;
  try {
    const res = await db.query(countPostByUserQuery);
    return res.rows;
  } catch (e) {
    console.log('there is an error');
    console.log(e);
  }
}

async function averagePostsPerUser() {
  const averagePostByUserQuery = `
  SELECT AVG(post_count) as average_posts
  FROM
  (SELECT COUNT(posts.id) as post_count FROM users LEFT JOIN posts ON users.id = posts.user_id GROUP BY users.id) AS user_per_counts
  `;
  try {
    const res = await db.query(averagePostByUserQuery);
    return res.rows;
  } catch (e) {
    console.log('there is an error');
    console.log(e);
  }
}

module.exports = { countPostByUser, averagePostsPerUser };
