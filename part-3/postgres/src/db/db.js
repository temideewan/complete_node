const { Pool } = require('pg');
require('dotenv').config();

// create a new pool instance to manage db connections

// connection string format
//  -> postgres -> :// -> [user] -> [password] -> @ -> host:port -> [database]
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function query(text, params) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);
    // execute time
    const duration = Date.now() - start;
    console.log(`Executed query:`, { text, duration, rows: result.rowCount });
    // TODO: remove this line in an actual application
    // await pool.end()
    return result
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { query };
