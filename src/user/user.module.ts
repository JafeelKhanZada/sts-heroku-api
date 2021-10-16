import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SecretDTO } from 'src/config/secret.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy],
  imports: [
    JwtModule.register({
      secretOrPrivateKey: new SecretDTO().getSecretKey(),
    }),
  ],
})
export class UserModule {}
