import { PartialType } from '@nestjs/mapped-types';
import {
    MaxLength,
    MinLength,
    IsNotEmpty,
    IsString
} from 'class-validator';
import { AuthSignInDto } from './sign-in';

export class AuthSignUpDto extends PartialType(AuthSignInDto) {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(64)
    name: string;
}