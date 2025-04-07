import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.jwt,
      ]),
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return user;
  }
}
