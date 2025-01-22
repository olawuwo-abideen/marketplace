import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'apps/product/src/schemas/product.schema';
import { User } from 'apps/auth/src/schemas/user.schema';
import * as mongoose from 'mongoose';
import { uploadImages } from './utils/aws';

@Injectable()

export class AdminService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}


  async createProduct(product: Product): Promise<Product> {
    const data = Object.assign(product);

    const res = await this.productModel.create(data);
    return res;
  }
    
    async updateProduct(id: string, product: Product): Promise<Product> {
      return await this.productModel.findByIdAndUpdate(id, product, {
        new: true,
        runValidators: true,
      });
    }
  
    async deleteProduct(id: string): Promise<{ deleted: boolean }> {
      await this.productModel.findByIdAndDelete(id);
      return { deleted: true };
    }
  
    async uploadImages(id: string, files: Array<Express.Multer.File>) {
      const product = await this.productModel.findById(id);
  
      if (!product) {
        throw new NotFoundException('Product not found.');
      }
  
      const images = await uploadImages(files);
  
      product.productImages = images as object[];
  
      await product.save();
  
      return product;

    }

    async getUsers(): Promise<User[]> {
      const users = await this.userModel.find();
      return users
      }


      async getUser(id: string): Promise<User> {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          throw new BadRequestException('Please enter correct id.');
        }
    
        const user = await this.userModel.findById(id);
    
        if (!user) {
          throw new NotFoundException('User not found.');
        }
    
        return user;
      }

}
