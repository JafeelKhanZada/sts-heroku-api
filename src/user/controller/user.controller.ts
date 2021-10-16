import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  signupUser(@Request() _req, @Response() _res, @Body() body) {
    return this.userService
      .signupUser(body)
      .then(res => {
        return _res.status(200).json({
          error: false,
          data: res,
          message: 'Sign Up Successfully',
        });
      })
      .catch(() => {
        return _res.status(400).json({
          error: true,
          data: null,
          message: 'Unable To Make User',
        });
      });
  }
  @Post('/login')
  login(@Request() _req, @Response() _res, @Body() body) {
    return this.userService
      .userLogin(body)
      .then(res => {
        return _res.status(200).json({
          error: false,
          data: res,
          message: 'User Login',
        });
      })
      .catch(() => {
        return _res.status(400).json({
          error: true,
          data: null,
          message: 'User Error',
        });
      });
  }
}
