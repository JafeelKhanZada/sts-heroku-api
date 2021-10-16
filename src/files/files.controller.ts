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
import { uploadInterceptor } from 'src/config/file-uploader';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @Get('/:id')
  seeuploadedImage(@Param('id') param, @Res() res) {
    return res.sendFile(param, { root: 'assets' });
  }
  @Post('/')
  @UseInterceptors(uploadInterceptor())
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
