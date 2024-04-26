import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto {
    @IsDate()
    @Type(()=> Date)
    startDate;

    @IsDate()
    @Type(()=> Date)
    endDate;

    @IsString()
    @IsNotEmpty()
    placeId;

    @IsString()
    @IsNotEmpty()
    invoiceId

}
