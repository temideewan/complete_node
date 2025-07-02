import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
export declare class DestinationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createDestinationDto: CreateDestinationDto): Promise<{
        id: number;
        name: string;
        travelDate: Date | null;
        notes: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
