import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {Income} from "../entities/income.entity";
import {CreateIncomeDto} from "./dto/create-income.dto";
import {Recurrence} from "../common/constants/recurrence.enum";


@Injectable()
@EntityRepository(Income)
export class IncomeRepository extends Repository<Income> {

    public async addIncome( income: Income ): Promise<Income> {
        return await this.save(income);
    }


    public async removeIncome(incomeId: number) {
        return this.delete({id:incomeId});
    }

}
