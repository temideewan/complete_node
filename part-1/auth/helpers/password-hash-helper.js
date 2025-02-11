const bcrypt = require('bcryptjs');
const passwordHasher = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error('Error while hashing password');
  }
}

module.exports = passwordHasher;
