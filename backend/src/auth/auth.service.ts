import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth-login.dto';
import { RegisterDto } from './auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
      ) {}
    
      async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.usersService.create({ ...dto, password: hashedPassword });
      }
    
      async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        console.log('Mot de passe fourni :', dto.password);
        console.log('Mot de passe en base :', user?.password);

        if (!user) {
          throw new UnauthorizedException('Email invalide');
        }
    
        const passwordValid = await bcrypt.compare(dto.password, user.password);
        console.log('password valid rerturns: ', passwordValid);
        if (!passwordValid) {
          throw new UnauthorizedException('Email ou mot de passe invalide');
        }
    
        // Générer un JWT
        const payload = { sub: user.id, role: user.role, };
        const token = await this.jwtService.signAsync(payload);
    
        return { token };
      }
    
      async getProfile(userId: number) {
        const user = await this.usersService.findById(userId);
        console.log(userId);
        if (!user) {
          throw new UnauthorizedException('Utilisateur introuvable');
        }
        return user;
      }
      
}
