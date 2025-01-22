import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class ReviewDto {

  @ApiProperty({
    required: true,
    description: 'Review Title',
    example: 'A very good product',
    })
  @IsNotEmpty()
  @IsString()
  reviewTitle: string;

  @ApiProperty({
    required: true,
    description: 'Detail Review',
    example: 'Its working fine but need more improvement',
    })
  @IsNotEmpty()
  @IsString()
  detailReview: string;


  @ApiProperty({
    required: true,
    description: 'The product rating',
    example: '4',
    })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
