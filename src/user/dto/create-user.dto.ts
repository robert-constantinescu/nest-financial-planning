import { MaxLength, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    username: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}
