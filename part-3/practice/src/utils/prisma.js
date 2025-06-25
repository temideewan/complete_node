const {PrismaClient} = require('../generated/prisma/index')

const prismaClient = new PrismaClient();

module.exports = prismaClient;
