import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsersService } from 'src/users/users.service.interface';
import { IAuthService } from './auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private usersService: IUsersService,
        private jwtService: JwtService
    ) {}

    async login(login: string, password: string): Promise<any> {
        const user = await this.usersService.login(login, password);

        if (user) {
            const payload = { username: user.login, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Usuário/senha Inválido!',
            }, HttpStatus.FORBIDDEN, {
                cause: 'Usuário/senha Inválido!'
            });
        }
    }
}
