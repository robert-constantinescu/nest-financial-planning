import {IsNotEmpty, IsNumber, IsString} from 'class-validator';


export class CreateExpenseDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    recurrence: string;

    @IsNotEmpty()
    @IsString()
    name: string;

}

