import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { SecretDTO } from 'src/config/secret.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: new SecretDTO().getSecretKey(),
    });
  }

  async validate(payload: any) {
    // check if user in the token actually exist
    const user = await this.userService.user(payload.id);
    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }
    return payload;
  }
}
