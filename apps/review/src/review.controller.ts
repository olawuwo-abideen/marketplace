import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'apps/auth/src/schemas/user.schema';
import { ReviewDto } from './dto/review.dto';
import { CurrentUser } from 'apps/auth/src/decorators/current-user.decorator';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('review/:id')
  @ApiOperation({ summary: 'Create product review' })
  @ApiBody({ type: ReviewDto, description: 'Review Data' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'Review created successfully.',
  })
public async createReview(
@CurrentUser() user: User,
@Param('id') productId: string,
@Body() data: ReviewDto,
) {
return await this.reviewService.createReview(user, productId, data);
}



@Get('product/:id')
@ApiOperation({ summary: 'Get reviews for a product' })
@ApiResponse({
  status: HttpStatus.OK,
  description: 'List of product reviews',
})
async getReviews(
  @CurrentUser() user: User,
  @Param('id') productId: string) {
  return await this.reviewService.getReviewsByProduct(user, productId);
}

@Get(':id')
@ApiOperation({ summary: 'Get a single review by ID' })
@ApiResponse({
  status: HttpStatus.OK,
  description: 'Review details',
})
async getReview(
  @CurrentUser() user: User,
  @Param('id') reviewId: string) {
  return await this.reviewService.getReviewById(user, reviewId);
}
  
}
