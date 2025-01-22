import { IsNotEmpty, IsInt,isDate, IsString, IsEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

@ApiProperty({
required: true,
description: 'The product name',
example: 'Shoe',
})
@IsString()
@IsNotEmpty()
productName: string;

@ApiProperty({
required: true,
description: 'The Product Price',
example: '20000',
})
@IsString()
@IsNotEmpty()
productPrice: number;

@ApiProperty({
required: true,
description: 'The product weight',
example: '2',
})
@IsInt()
@IsNotEmpty()
productWeight: number;

@ApiProperty({
required: true,
description: 'The product quantity',
example: '100',
})
@IsInt()
@IsNotEmpty()
productQuantity: number;

}


export class UpdateProductDto {

    @ApiProperty({
    required: true,
    description: 'The product name',
    example: 'Shoe',
    })
    @IsString()
    @IsNotEmpty()
    productName: string;
    
    @ApiProperty({
    required: true,
    description: 'The Product Price',
    example: '20000',
    })
    @IsString()
    @IsNotEmpty()
    productPrice: number;
    
    @ApiProperty({
    required: true,
    description: 'The product weight',
    example: '2',
    })
    @IsInt()
    @IsNotEmpty()
    productWeight: number;
    
    @ApiProperty({
    required: true,
    description: 'The product quantity',
    example: '100',
    })
    @IsInt()
    @IsNotEmpty()
    productQuantity: number;
    
    
    }