import {
  BadRequestException,
  Injectable,
  NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose'
import { Product } from './schemas/product.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel:mongoose.Model<Product>
    ){}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products
    }

    async searchProducts(query: Query): Promise<Product[]> {
      const resPerPage = 2;
      const currentPage = Number(query.page) || 1;
      const skip = resPerPage * (currentPage - 1);
  
      const keyword = query.keyword
        ? {
            title: {
              $regex: query.keyword,
              $options: 'i',
            },
          }
        : {};
  
      const books = await this.productModel
        .find({ ...keyword })
        .limit(resPerPage)
        .skip(skip);
      return books;
    }


    async getProduct(id: string): Promise<Product> {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
      throw new BadRequestException('Please enter a correct ID.');
      }
      
      const product = await this.productModel.findOne({ _id: id });
      if (!product) {
      throw new NotFoundException('Product not found ');
      }
      
      return product;
      }







  }

