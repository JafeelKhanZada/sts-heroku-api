import {
  Controller,
  Post,
  Response,
  Body,
  Get,
  Param,
  Res,
  Query,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('')
  createProduct(@Response() _res, @Body() body) {
    const { data, file } = body;
    return this.productService
      .createProduct(data, file)
      .then(res => {
        return _res.status(200).json({
          error: false,
          message: 'Product Created!',
          data: res,
        });
      })
      .catch(ee => console.log('ee', ee));
  }
  @Get('/')
  getProducts(@Query() query, @Res() _res) {
    return this.productService.getProduct(query).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Fetch',
        data: res,
      });
    });
  }
  @Patch('/:id')
  updateById(@Param() param, @Res() _res, @Body() body) {
    return this.productService.updateById(param.id, body).then(res => {
      return _res.status(200).json({
        error: false,
        message: 'Product Updatd!',
        data: res,
      });
    });
  }
  @Get('/:id')
  getById(@Param() param, @Res() _res) {
    return this.productService.getProductById(param.id).then(res => {
      return _res
        .status(200)
        .json({ error: false, message: 'Product Fetched!', data: res });
    });
  }
  @Post('/listing')
  getListing(@Body() body, @Res() _res, @Query() query) {
    return this.productService.getProductForListing(query, body).then(res => {
      return _res
        .status(200)
        .json({ error: false, message: 'Product Fetched!', data: res });
    });
  }
}
