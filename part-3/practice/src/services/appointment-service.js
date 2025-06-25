const prisma = require('../utils/prisma');

module.exports.createAppointment = async ({
  title,
  description,
  date,
  time,
  profileId,
}) => {
  try {
    if (!title || !description || !date || !time || profileId) {
      throw new Error(
        'Invalid input, all fields "title, description, date, time, profileId" fields are required'
      );
    }
    const newAppointment = await prisma.appointment.create({
      data: {
        date,
        description,
        title,
        time,
        profileId,
      },
    });

    if (!newAppointment) {
      throw new Error('Something went wrong while creating that appointment');
    }
    return newAppointment;
  } catch (e) {
    throw e;
  }
};

module.exports.getAllAppointments = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  try {
    const allAppointments = prisma.appointment.findMany({
      skip,
      take: limit,
    });

    if (!allAppointments) {
      throw new Error(
        'Something went wrong while trying to get all appointments'
      );
    }
  } catch (e) {
    throw e;
  }
};
module.exports.getAllAppointmentsForAUser = async ({
  page = 1,
  limit = 10,
  profileId,
}) => {
  const skip = (page - 1) * limit;
  try {
    if (!profileId)
      throw new Error('Please select a profile to get appointments');
    const allAppointments = prisma.appointment.findMany({
      skip,
      take: limit,
      where: {
        profileId,
      },
    });

    if (!allAppointments) {
      throw new Error(
        'Something went wrong while trying to get all appointments'
      );
    }
  } catch (e) {
    throw e;
  }
};

module.exports.updateAppointment = async (
  id,
  { title, description, date, time, profileId }
) => {
  try {
    const appointmentToUpdate = await prisma.$transaction(async (pr) => {
      const appointment = await prisma.appointment.findUnique({
        where: { id, profileId },
      });
      if (!appointment)
        throw new Error(`The appointment with id: ${id} does not exist`);
      return prisma.appointment.update({
        where: { id },
        data: {
          title: title || appointment.title,
          description: description || appointment.description,
          date: date || appointment.date,
          time: time || appointment.time,
        },
      });
    });
    if (!appointmentToUpdate)
      throw new Error('Something went wrong while updating appointment');
  } catch (e) {
    throw e;
  }
};

