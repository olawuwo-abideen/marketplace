import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateProductDto, UpdateProductDto } from 'apps/product/src/dto/product.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'apps/auth/src/decorators/roles.decorator';
import { Role } from 'apps/auth/src/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'apps/auth/src/guards/role.guards';
import { Product } from 'apps/product/src/schemas/product.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from 'apps/auth/src/schemas/user.schema';

@ApiTags('admin')
@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create Product' })
  @ApiBody({ type: CreateProductDto, description: 'Product Data' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'Data Successfully created',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async createProduct(
  @Body()
  product: CreateProductDto
  ): Promise<Product> {
  return this.adminService.createProduct(product);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update Product' })
  @ApiBody({ type: UpdateProductDto, description: 'Product Data' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'Data Successfully updated',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateProduct(
    @Param('id')
    id: string,
    @Body()
    product: UpdateProductDto,
  ): Promise<Product> {
    return this.adminService.updateProduct(id, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Product' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Data Successfully deleted',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async deleteProduct(
    @Param('id')
    id: string,
  ): Promise<{ deleted: boolean }> {
    return this.adminService.deleteProduct(id);
  }

  @Put('upload/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1000,
          message: 'File size must be less than 1MB',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.adminService.uploadImages(id, files);
  }



    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
      status: HttpStatus.OK,
      description:
        'Data fetched successfully.',
    })
    @UseGuards(AuthGuard(), RolesGuard)
    async getUsers(): Promise<User[]>{
    return this.adminService.getUsers()
    }



    @Get(':id')
    @ApiOperation({ summary: 'Get user' })
    @ApiResponse({
      status: HttpStatus.OK,
      description:
        'Data fetched successfully.',
    })
    async getUser(
      @Param('id')
      id: string,
    ): Promise<User> {
      return this.adminService.getUser(id);
    }
}
