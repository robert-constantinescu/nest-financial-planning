import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {Income} from "../entities/income.entity";
import {CreateIncomeDto} from "./dto/create-income.dto";
import {Recurrence} from "../common/constants/recurrence.enum";


@Injectable()
@EntityRepository(Income)
export class IncomeRepository extends Repository<Income> {

    public async addIncome(
        createIncomeDto: CreateIncomeDto,
    ): Promise<Income> {
        const { amount, recurrence, userId, name } = createIncomeDto;
        const income = new Income();
        income.userId = userId;
        income.amount = amount;
        income.name = name;
        income.recurrence = Recurrence[recurrence];
        await this.save(income);
        return income;
    }


    public async removeIncome(incomeId: number) {
        return this.delete({id:incomeId});
    }
}
