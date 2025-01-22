import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'apps/auth/src/schemas/user.schema';
import { Product } from 'apps/product/src/schemas/product.schema';
import {  Types } from 'mongoose';

@Schema({
timestamps: true,
})
export class Review {


    @Prop({ type: String, required: true })
    reviewTitle: string;

    @Prop({ type: String, required: true })
    detailReview: string;
  
    @Prop({ type: Number, required: true, min: 1, max: 5 })
    rating: number;
  
    @Prop({ type:Types.ObjectId, ref: 'User', required: true })
    user: User;
  
    @Prop({ type:Types.ObjectId, ref: 'Product', required: true })
    product: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);