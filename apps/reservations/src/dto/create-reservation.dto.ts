import { CreateChargeDto } from "@app/common";
import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";


export class CreateReservationDto {
    @IsDate()
    @Type(()=> Date)
    startDate;

    @IsDate()
    @Type(()=> Date)
    endDate;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=> CreateChargeDto)
    charge: CreateChargeDto
}
