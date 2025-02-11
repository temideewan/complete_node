// qAZZ95OEpiFxjLiw
// temideewan

const mongoose = require('mongoose');

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now() },
});

// user model
const User = mongoose.model('User', userSchema);

async function runQueryExamples() {
  try {
    // create a new document
    const newUser = await User.create({
      name: 'Updated Doe',
      email: 'updated@gmail.com',
      age: 75,
      isActive: true,
      tags: ['Developer', ],
    });
    console.log(`created a new user `, newUser);

    // get all users
    // const allUsers = await User.find({});
    // console.log('All users: ', allUsers);

    // get all inactive users
    // const inactiveUsers = await User.find({
    //   isActive: false,
    // })
    // console.log('Inactive users: ', inactiveUsers);

    // get john does
    // const johnDoe = await User.find({name: 'John Doe'});
    // console.log('John Doe: ', johnDoe);

    // const lastUser = await User.findById(newUser._id);
    // console.log('Last user: ', lastUser);

    // specific fields
    // const selectFields = await User.find().select("name email -_id")
    // console.log('Select fields: ', selectFields);

    // const limitedUsers = await User.find().limit(5).skip(1).select("name email -_id");
    // console.log('Limited users: ', limitedUsers);

    // const sortedUsers = await User.find().sort({age: 1})
    // console.log('Sorted users: ', sortedUsers);

    // // count documents
    // const countUsers = await User.countDocuments({isActive: false});
    // console.log('Total active users: ', countUsers);

    // delete a user
    // const deletedUserInfo = await User.findByIdAndDelete(deletedUser._id)
    // console.log('Deleted user info: ', deletedUserInfo);

    const updatedUser = await User.findByIdAndUpdate(newUser._id, {
      $set: {age: 10}, $push: {tags: 'updated'}
    }, {new: true})
    console.log('Updated user: ', updatedUser);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
