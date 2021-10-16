import { Controller, Post, Res, Body } from '@nestjs/common';
import { QouteService } from './qoute.service';

@Controller('qoute')
export class QouteController {
  constructor(private readonly qouteService: QouteService) {}
  @Post('/')
  createQoutes(@Res() _res, @Body() body) {
    return this.qouteService.createQoute(body).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Qoute Created!',
        data: res,
      });
    });
  }
}
