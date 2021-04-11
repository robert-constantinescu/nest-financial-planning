import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import {CreateIncomeDto} from "./create-income.dto";


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

    public static fromCredentials(credentials: Credentials): CreateUserDto{
        const user = new CreateUserDto();
        user.username = credentials.username;
        user.password = credentials.password;
        user.email = credentials.email;

        return user;
    }

}
