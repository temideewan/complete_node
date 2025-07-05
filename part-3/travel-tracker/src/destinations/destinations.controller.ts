import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { RequestUser, User } from 'src/decorators/user.decorator';

// crud destinations
@Controller('destinations')
@UseGuards(JwtAuthGuard)
export class DestinationsController {
  constructor(private readonly destinationService: DestinationsService) {}

  @Post()
  create(
    @User() user: RequestUser,
    @Body() createDestinationDto: CreateDestinationDto,
  ) {
    return this.destinationService.create(user?.userId, createDestinationDto);
  }

  @Get()
  findAll(@User() user: RequestUser) {
    return this.destinationService.findAll(user.userId);
  }
  @Get(':id')
  findOne(@User() user: RequestUser, @Param('id') id: string) {
    const destination = this.destinationService.findOne(user.userId, +id);
    return destination;
  }

  @Patch(':id')
  update(
    @User() user: RequestUser,
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    // if (!req.user || !req.user?.userId) {
    //   throw new UnauthorizedException('User is not authorized to create this');
    // }
    return this.destinationService.updateDestination(
      user.userId,
      +id,
      updateDestinationDto,
    );
  }
}
