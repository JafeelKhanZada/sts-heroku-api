import {
  Controller,
  Post,
  Response,
  Request,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { uploadInterceptor } from 'src/config/file-uploader';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('/create')
  @UseInterceptors(uploadInterceptor())
  createBrand(
    @UploadedFile() file,
    @Request() _req,
    @Response() _res,
    @Body() body,
  ) {
    return this.brandService.makeBrand(body, file).then(res => {
      return _res
        .status(200)
        .json({ error: false, message: 'Brand Created!', data: res });
    });
  }
  @Get('/')
  getBrands(@Query() query) {
    return this.brandService.getBrands(query);
  }
  @Patch('/:id')
  updateBrand(@Param() param, @Body() body, @Response() _res) {
    const { id } = param;
    return this.brandService.updateBrands(id, body).then(res => {
      return _res
        .status(200)
        .json({ error: false, message: 'Brand Updated!', data: res });
    });
  }
  @Get('/:id')
  getBrandById(@Param() param, @Response() _res) {
    return this.brandService.getBrandById(param.id).then(res => {
      return _res.status(200).json({ error: false, message: '', data: res });
    });
  }
}
