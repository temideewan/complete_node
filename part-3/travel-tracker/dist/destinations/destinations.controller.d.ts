import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
export declare class DestinationsController {
    private readonly destinationService;
    constructor(destinationService: DestinationsService);
    create(req: any, createDestinationDto: CreateDestinationDto): Promise<{
        id: number;
        name: string;
        travelDate: Date | null;
        notes: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
