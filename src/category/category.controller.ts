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
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('/')
  @UseInterceptors(uploadInterceptor())
  createBrand(
    @UploadedFile() file,
    @Request() _req,
    @Response() _res,
    @Body() body,
  ) {
    return this.categoryService.createCategory(body, file).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Category Created!',
        data: res,
      });
    });
  }
  @Get('/')
  getCategories(@Query() query, @Response() _res) {
    return this.categoryService.getCategory(query).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Category Fetched!!',
        data: res,
      });
    });
  }
  @Patch('/:id')
  updateCategory(@Param() param, @Response() _res, @Body() body) {
    const { id } = param;
    return this.categoryService.updateCategory(id, body).then(res => {
      return _res
        .status(200)
        .json({ error: false, message: 'Category Updated!', data: res });
    });
  }
  @Get('/:id')
  getById(@Param() param, @Response() _res) {
    return this.categoryService.getById(param.id).then(res => {
      return _res.status(200).json({
        error: false,
        message: '',
        data: res,
      });
    });
  }
}
