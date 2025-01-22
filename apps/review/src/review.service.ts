import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDto } from './dto/review.dto';
import { Review } from './schema/review.schema';
import { Product } from 'apps/product/src/schemas/product.schema';
import { User } from 'apps/auth/src/schemas/user.schema';


@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}



  async createReview(user: User, productId: string, data: ReviewDto): Promise<Review> {

    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const newReview = new this.reviewModel({
      ...data,
      product: productId,
      user: user._id,
    });

    const savedReview = await newReview.save();

    return savedReview;
  }



  async getReviewsByProduct(productId: string) {
    const reviews = await this.reviewModel
      .find({ product: productId })
      .populate('user', 'name email') 
      .exec();

    if (!reviews || reviews.length === 0) {
      throw new NotFoundException('No reviews found for this product');
    }

    return reviews;
  }


  async getReviewById(reviewId: string) {
    const review = await this.reviewModel
      .findById(reviewId)
      .populate('user', 'name email')
      .populate('product', 'name')
      .exec();

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

}
