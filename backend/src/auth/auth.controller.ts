import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from './auth-login.dto';
import { RegisterDto } from './auth-register.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

interface JwtPayload {
    userId: number;
  }  

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { token } = await this.authService.login(dto);

        // Définir un cookie sécurisé
        res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // mettre true en prod (https)
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
        });

        return { message: 'Connexion réussie' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req: Request) {
        const user = req.user as JwtPayload;
        console.log('user : ', user);
        return this.authService.getProfile(user.userId);
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('jwt');
        return { message: 'Déconnecté avec succès' };
    }



}
