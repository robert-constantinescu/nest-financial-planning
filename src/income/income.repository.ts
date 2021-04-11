import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {Income} from "../entities/income.entity";
import {CreateIncomeDto} from "../dto/create-income.dto";
import {Recurrence} from "../common/constants/recurrence.enum";


@Injectable()
@EntityRepository(Income)
export class IncomeRepository extends Repository<Income> {

    public async addIncome( income: Income ): Promise<Income> {
        return await this.save(income);
    }

    public async updateIncome( income: Income) {
        return await this.update({id:income.id}, income);
    }

    public async removeIncome(incomeId: number[]) {
        return await this.delete(incomeId);
    }

    public async findAll(userId: number): Promise<Income[]> {
        return await this.find({where: {userId: userId}});
    }
}
