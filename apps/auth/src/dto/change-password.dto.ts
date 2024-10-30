import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { PasswordMatch } from '../validations/password-match.validation';


export class ChangePasswordDto {

  @IsNotEmpty({ message: 'Current password is required' })
  currentPassword: string;


  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*-?&])[A-Za-z\d@$!%*-?&]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    },
  )
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @PasswordMatch()
  confirmPassword: string;
}
