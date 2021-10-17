import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Request,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadInterceptor } from 'src/config/file-uploader';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @Get('/:id')
  seeuploadedImage(@Param('id') param, @Res() res) {
    return this.fileService
      .getS3Image(param)
      .then(val => res.status(200).json({ url: val }));
  }
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Request() _req, @Response() _res) {
    return this.fileService
      .uploadFile(file)
      .then(res =>
        _res
          .status(200)
          .json({ error: false, message: 'File Uploaded', data: res }),
      );
  }
}
