import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ReservationRepository } from './reservations.repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {name: ReservationDocument.name, schema:ReservationSchema}
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required()
      })
    })
  ],
})
export class ReservationsModule {}
