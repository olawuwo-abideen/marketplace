import { Body, Controller, Get, HttpStatus, Put, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from 'apps/auth/src/decorators/current-user.decorator';
import RequestWithUser from './dto/request-with-user.dto'
import { User } from 'apps/auth/src/schemas/user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ 
      status: HttpStatus.OK,
      description:
        'User profile retrieve successfully.',
    })
  async getProfile(@Request() req: RequestWithUser) {
    return await this.userService.profile(req.user);
  }


  @Put('')
    @ApiOperation({ summary: 'Update user profile' })
    @ApiBody({ type: UpdateProfileDto, description: 'Update user profile' })
    @ApiResponse({
      status: HttpStatus.OK,
      description:
        'User profile updated successfully',
    })
  public async updateProfile(
    @Body() payload: UpdateProfileDto,
    @CurrentUser() user: User,
  ) {
    return await this.userService.updateProfile(payload, user);
  }

}
