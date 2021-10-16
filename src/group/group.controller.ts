import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/')
  createGroup(@Body() body, @Res() _res) {
    return this.groupService.makeGroup(body).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Group Created!',
        data: res,
      });
    });
  }
  @Get('/')
  getGroups(@Res() _res, @Query() query) {
    return this.groupService.getGroups(query).then(res => {
      return _res.status(200).json({
        error: true,
        message: 'Fetched!',
        data: res,
      });
    });
  }
  @Patch('/grouping/:id')
  makeGroup(@Body() body, @Res() _res, @Param() param) {
    return this.groupService.updateFieldsByGroup(param.id, body).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Product Are Grouped',
        data: res,
      });
    });
  }
}
