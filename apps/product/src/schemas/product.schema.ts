import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
timestamps: true,
})
export class Product {


@Prop()
productName: string;

@Prop()
productPrice: number;

@Prop()
productWeight:number

@Prop()
productQuantity: number;

@Prop()
productImages?: object[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);