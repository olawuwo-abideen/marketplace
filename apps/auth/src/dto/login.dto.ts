import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDto {

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;


  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*-?&])[A-Za-z\d@$!%*-?&]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;
}
