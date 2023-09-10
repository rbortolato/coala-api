import { Controller, Request, Post, Get, Body } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { CreateUserDto } from './dto/createUserDto';
import { IUsersService } from './users.service.interface';

@Controller('users')
export class UsersController {
    constructor(private usersService: IUsersService) { }

    @Get()
    async currentUser(@Request() req) {
        return await this.usersService.currentUser(req.user.id)
    }

    @Public()
    @Post()
    async createUser(@Body() body: CreateUserDto) {
        return await this.usersService.createUser(body)
    }
}
