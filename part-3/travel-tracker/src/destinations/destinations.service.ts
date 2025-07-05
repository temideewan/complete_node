import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createDestinationDto: CreateDestinationDto) {
    return this.prisma.destination.create({
      data: {
        ...createDestinationDto,
        travelDate: createDestinationDto.travelDate
          ? new Date(createDestinationDto.travelDate).toISOString()
          : undefined,
        userId,
      },
    });
  }
  async findAll(userId: number) {
    return this.prisma.destination.findMany({
      where: {
        userId,
      },
    });
  }
  async findOne(userId: number, id: number) {
    const destination = await this.prisma.destination.findFirst({
      where: {
        userId,
        id,
      },
    });
    if (!destination) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }
    return destination;
  }

  async removeDestination(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.prisma.destination.delete({
      where: {
        id,
      },
    });
  }

  async updateDestination(
    userId: number,
    id: number,
    updateDestinationDto: UpdateDestinationDto,
  ) {
    await this.findOne(userId, id);
    return this.prisma.destination.update({
      where: { id },
      data: updateDestinationDto,
    });
  }
}
