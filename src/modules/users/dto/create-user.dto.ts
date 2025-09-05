import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
    {
      message:
        'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.',
    }
  )
  password: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Phone number must be valid' })
  phoneNumber?: string;
}
