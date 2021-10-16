import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
  async signupUser(user: {
    email: string;
    password: string;
  }): Promise<User | null> {
    return bcrypt.genSalt(10).then(res => {
      return bcrypt.hash(user.password, res).then(val => {
        return this.prisma.user.create({
          data: {
            email: user.email,
            password: val,
          },
        });
      });
    });
  }
  async userLogin(body: { email: string; password: string }): Promise<any> {
    const { email, password } = body;
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      const response = await bcrypt.compare(password, user.password);
      if (response) {
        const accessToken = this.jwtService.sign(JSON.stringify(user));
        return { accessToken };
      } else {
        throw new NotFoundException('Username or password wrong!');
      }
    } else {
      throw new NotFoundException('User not exists!');
    }
  }
}
