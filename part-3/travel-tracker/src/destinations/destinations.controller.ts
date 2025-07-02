import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';

// crud destinations
@Controller('destinations')
@UseGuards(JwtAuthGuard)
export class DestinationsController {
  constructor(private readonly destinationService: DestinationsService) {}

  @Post()
  create(@Request() req, @Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.create(
      req?.user?.userId,
      createDestinationDto,
    );
  }
}
