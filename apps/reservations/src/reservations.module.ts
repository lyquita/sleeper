import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ReservationRepository } from './reservations.repository';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {name: ReservationDocument.name, schema:ReservationSchema}
    ]),
    LoggerModule
  ],
})
export class ReservationsModule {}
