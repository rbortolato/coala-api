import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { IUsersService } from './users.service.interface';
import { CreateUserDto } from './dto/createUserDto';
import { UserDto } from './dto/userDto';

@Injectable()
export class UsersService implements IUsersService {
    constructor(private prisma: PrismaService) {}

    async currentUser(id: number): Promise<UserDto> {
        const where: Prisma.usersWhereUniqueInput = { id }
        return this.prisma.users.findUnique({
            where,
            select: {
                id: true,
                login: true,
                name: true
            }
        });
    }

    async login(login: string, password: string): Promise<UserDto> {
        const where: Prisma.usersWhereUniqueInput = { login }
        const user = await this.prisma.users.findUnique({
            where,
        });

        if (user) {
            const passwordMatch = await compare(password, user.password);
            if (!passwordMatch) return null;
        }

        return user;
    }

    async createUser(createUserData: CreateUserDto): Promise<UserDto> {
        try {
            const password = await hash(createUserData.password, 10);
            return await this.prisma.users.create({
                data: {
                    login: createUserData.login,
                    password: password,
                    name: createUserData.name
                }
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'Usuário já cadastrado!',
                }, HttpStatus.FORBIDDEN, {
                    cause: e
                });
            }
        }
    }
}
