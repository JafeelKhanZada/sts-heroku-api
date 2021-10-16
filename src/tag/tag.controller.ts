import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Response,
} from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Post('/')
  createTag(@Body() body, @Response() _res) {
    return this.tagService.createTag(body).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Tag Created!',
        data: res,
      });
    });
  }
  @Get('/')
  getTags(@Response() _res, @Query() query) {
    return this.tagService.getTags(query).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Fetched',
        data: res,
      });
    });
  }
  @Patch('/:id')
  updateTags(@Param() param, @Response() _res, @Body() body) {
    const { id } = param;
    return this.tagService.updateTag(id, body).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Tag Updated!',
        data: res,
      });
    });
  }
  @Get('/:id')
  getById(@Param() param, @Response() _res) {
    return this.tagService.getById(param.id).then(res => {
      return _res
        .status(200)
        .json({ error: false, message: 'Fetch', data: res });
    });
  }
}
