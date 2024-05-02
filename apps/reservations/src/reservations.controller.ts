import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto, @CurrentUser() user: UserDto) {
    return await this.reservationsService.create(createReservationDto, user._id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') _id: string) {
    return this.reservationsService.findOne(_id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') _id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(_id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') _id: string) {
    return this.reservationsService.remove(_id);
  }
}
