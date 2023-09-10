import { Controller, Request, Post } from '@nestjs/common';
import { Public } from './auth.decorator';
import { IAuthService } from './auth.service.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: IAuthService) {}

    @Public()
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.body.login, req.body.password);
    }
}
