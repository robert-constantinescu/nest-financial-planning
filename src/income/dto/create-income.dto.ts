import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {Income} from "../../entities/income.entity";
import {Recurrence} from "../../common/constants/recurrence.enum";


export class CreateIncomeDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    currentAmount: number;

    @IsNotEmpty()
    @IsNumber()
    goalAmount: number;

    @IsNotEmpty()
    @IsString()
    recurrence: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    public static incomeEntityFromDto(incomeDto: CreateIncomeDto): Income {
        const { currentAmount, goalAmount, recurrence, type, userId } = incomeDto;
        const income = new Income();
        income.userId = userId;
        income.currentAmount = currentAmount;
        income.goalAmount = goalAmount;
        income.type = type;
        income.recurrence = Recurrence[recurrence];
        return income;
    }

}

