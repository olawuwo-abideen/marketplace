import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'apps/auth/src/schemas/user.schema';
import * as mongoose from 'mongoose'
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel:mongoose.Model<User>
    ){}


    public async profile(user: User) {
        return {
          ...user,
        };
      }

    public async updateProfile(
        data: UpdateProfileDto,
        user: User,
      ): Promise<User> {
        const dataToUpdate: Partial<User> = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        };
      
        Object.assign(user, dataToUpdate);
      
        await this.userModel.findByIdAndUpdate(user);
      
        return user;
      }

}
