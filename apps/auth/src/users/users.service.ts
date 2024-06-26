import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs'
import * as _ from 'lodash'
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly userRespository: UsersRepository) { }

    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto)
        return this.userRespository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        })
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
           const validateUser = await this.userRespository.findOne({ email: createUserDto.email })
           if(_.isEmpty(validateUser)){
            throw new Error()
           }
        } catch (err) {
            return
        }

        throw new UnprocessableEntityException('Email already exist.')
    }

    async verifyUser(email: string, password: string) {
        const user = await this.userRespository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new UnauthorizedException("Credentials are not valid.")
        }

        return user
    }

    async getUser(getUserDto: GetUserDto) {
        return this.userRespository.findOne(getUserDto)
    }
}
