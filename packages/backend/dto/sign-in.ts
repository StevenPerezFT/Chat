import {
    IsEmail,
    MaxLength,
    MinLength,
    IsNotEmpty,
    IsString
} from 'class-validator';
export class AuthSignInDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(64)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(64)
    password: string;
}
