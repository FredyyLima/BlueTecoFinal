import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { jwtConstants } from './jwt.constants';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { email: string}) {
      const validateUser = await this.prismaService.user.findUnique({
          where: { email: payload.email },
      });

      if(!validateUser){
        throw new NotFoundException('Usuário não cadastrado ou não está autenticado. Tente novamente.')
      }

      return validateUser
  }
}
