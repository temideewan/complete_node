const prisma = require('../utils/prisma');

module.exports.createProfile = async ({ name, email, avatar }) => {
  try {
    if (!name || !email) {
      throw new Error(
        "Please add required fields to create valid profile, 'name, email' fields are required"
      );
    }
    const newProfile = await prisma.profile.create({
      data: {
        name,
        email,
        avatar,
      },
    });
    if (!newProfile)
      throw new Error('Something went wrong while creating the profile');
    return newProfile;
  } catch (e) {
    throw e;
  }
};

module.exports.getProfile = async (id) => {
  try {
    if (!id) throw new Error('Please enter a valid id for the profile');
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        appointments: true,
      },
    });
    if (!profile)
      throw new Error('Something went wrong trying to retrieve the profile');
    return profile;
  } catch (e) {
    throw e;
  }
};
module.exports.deleteProfile = async (id) => {
  try {
    if (!id) throw new Error('Please enter a valid id for the profile');
    const profile = await prisma.profile.delete({
      where: { id },
      include: {
        appointments: true,
      },
    });
    if (!profile)
      throw new Error('Something went wrong trying to delete the profile');
    return profile;
  } catch (e) {
    throw e;
  }
};
