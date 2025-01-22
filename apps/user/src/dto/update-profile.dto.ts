import {
IsEmail,
IsMobilePhone,
IsNotEmpty,
IsString,
Matches,
MaxLength,
MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
@ApiProperty({
required: true,
description: 'The first name of the user',
example: 'Jane',
})
@IsNotEmpty()
@IsString()
firstName: string;


@ApiProperty({
required: true,
description: 'The last name of the user',
example: 'Doe',
})
@IsNotEmpty()
@IsString()
lastName: string;


@ApiProperty({
required: true,
description: 'The user phone number',
example: '+234555555555',
})
@IsNotEmpty()
@IsMobilePhone()
phoneNumber: string;

}
