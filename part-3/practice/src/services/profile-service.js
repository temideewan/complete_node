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
module.exports.getAllProfile = async (id, includeAppointments = false) => {
  try {
    if (!id) throw new Error('Please enter a valid id for the profile');
    const profile = await prisma.profile.findMany({
      include: {
        appointments: includeAppointments,
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

module.exports.updateProfile = async (id, { name, avatar }) => {
  try {
    const updatedProfile = await prisma.$transaction(async (prisma) => {
      const profile = await prisma.profile.findUnique({ id });
      if (!profile) throw new Error('Profile not found');
      const updatedProfile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          name: name || profile.name,
          avatar: avatar || profile.avatar,
        },
      });
      return updatedProfile;
    });
    if (!updatedProfile)
      throw new Error(
        'Something went wrong while trying to update the profile'
      );
    return updatedProfile;
  } catch (e) {
    throw e;
  }
};
