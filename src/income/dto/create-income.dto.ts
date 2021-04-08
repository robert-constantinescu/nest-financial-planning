import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {Income} from "../../entities/income.entity";
import {Recurrence} from "../../common/constants/recurrence.enum";


export class CreateIncomeDto {

    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    currentAmount: number;

    @IsNotEmpty()
    @IsNumber()
    goalAmount: number;

    @IsNumber()
    yearlyAmount: number;

    @IsNotEmpty()
    @IsString()
    recurrence: string;

    @IsNotEmpty()
    type: Recurrence;


    public equalsIncomeEntity(incomeToCompare: Income): boolean{
        let properties = Object.getOwnPropertyNames(this)
        for (let property of properties) {
            if (this[property] !== incomeToCompare[property]) {
                return false;
            }
        }
        return true;
    }

    public static initDto(incomeDto: CreateIncomeDto): CreateIncomeDto {
        const { currentAmount, goalAmount, recurrence, type, id } = incomeDto;
        const income = new CreateIncomeDto();
        income.id = id.toString() === "" ? null : id;
        income.currentAmount = currentAmount;
        income.goalAmount = goalAmount;
        income.type = type;
        income.recurrence = Recurrence[recurrence];
        return income;
    }

    public static incomeEntityFromDto(incomeDto: CreateIncomeDto, userId: number): Income {
        const { currentAmount, goalAmount, recurrence, type, id } = incomeDto;
        const income = new Income();
        // income.id = id.toString() === "" ? null : id;
        income.userId = userId;
        income.currentAmount = currentAmount;
        income.goalAmount = goalAmount;
        income.type = type;
        income.recurrence = Recurrence[recurrence];
        return income;
    }



    public equalsIncomeDto(incomeToCompare: CreateIncomeDto): boolean {
        console.log("incomeToCompare: ", JSON.stringify(incomeToCompare));
        console.log("this: ", JSON.stringify(this));
        return true;
    }
    
}

