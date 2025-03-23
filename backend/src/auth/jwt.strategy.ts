import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (req: Request) => {
              const token = req?.cookies?.jwt;
              console.log('→ JWT dans cookie :', token); // 👈 Ajoute ce log
              return token;
            },
          ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
    });
  }

  async validate(payload: any) {
    console.log('→ Payload JWT validé :', payload);
    return { userId: payload.sub, role: payload.role, };
  }
}
