import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Response,
  Get,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { uploadInterceptor } from 'src/config/file-uploader';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly SubCategoryService: SubCategoryService) {}

  @Post('/')
  @UseInterceptors(uploadInterceptor())
  createSubCategory(
    @UploadedFile() file,
    @Request() _req,
    @Response() _res,
    @Body() body,
  ) {
    return this.SubCategoryService.createSubCategory(body, file).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Sub Category Created!',
        data: res,
      });
    });
  }
  @Get('/')
  getSubCategory(@Response() res, @Query() query) {
    return this.SubCategoryService.getSubCategory(query).then(val => {
      return res
        .status(200)
        .json({ error: false, message: 'Sub Category fetchd', data: val });
    });
  }
  @Patch('/:id')
  updateSubCategory(@Response() _res, @Body() body, @Param() param) {
    const { id } = param;
    return this.SubCategoryService.updateSubCategory(id, body).then(res =>
      _res.status(200).json({
        error: false,
        message: 'Sub Category Updated!',
        data: res,
      }),
    );
  }
  @Get('/:id')
  getById(@Param() param, @Response() _res) {
    const { id } = param;
    return this.SubCategoryService.getSubCategoryById(id).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Fetched!',
        data: res,
      });
    });
  }
  @Get('/byCategoryId/:id')
  getByCategoryId(@Param() param, @Response() _res) {
    const { id } = param;
    return this.SubCategoryService.getByMainCategory(id).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Fetched!',
        data: res,
      });
    });
  }
}
