import { Controller, Get, HttpStatus, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'apps/auth/src/guards/role.guards';

@ApiTags('product')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Data fetched successfully.',
  })
  @UseGuards(AuthGuard(), RolesGuard)
  async getProducts(@Req() req): Promise<Product[]>{
  return this.productService.getProducts()
  }

  @Get()
  @ApiOperation({ summary: 'Search products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Data fetched successfully.',
  })
@UseGuards(AuthGuard(), RolesGuard)
async searchProducts(@Query() query: ExpressQuery): Promise<Product[]> {
  return this.productService.searchProducts(query);
}


  @Get(':id')
@ApiOperation({ summary: 'Get product by id' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
  'Data Successfully fetched',
})
@UseGuards(AuthGuard(), RolesGuard)
async getProduct(
@Param('id')
id: string,
@Req() req
): Promise<Product> {
return this.productService.getProduct(id);
}


}
