import {MaxLength, IsNotEmpty, IsString, IsEmail} from 'class-validator';
import {CreateIncomeDto} from "./create-income.dto";


export class CreateUserDto {

    @IsString()
    @MaxLength(50)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    public static fromCredentials(credentials: Credentials): CreateUserDto{
        const user = new CreateUserDto();
        user.username = credentials.username ? credentials.username : "";
        user.password = credentials.password;
        user.email = credentials.email;
        return user;
    }

}
