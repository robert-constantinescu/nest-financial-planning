import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {Income} from "../entities/income.entity";
import {CreateIncomeDto} from "../dto/create-income.dto";
import {Recurrence} from "../common/constants/recurrence.enum";
import {UpdateIncomeDto} from "../dto/update-income.dto";
import {User} from "../entities/user.entity";


@Injectable()
@EntityRepository(Income)
export class
 IncomeRepository extends Repository<Income> {

    public async addIncome( income: Income ): Promise<Income> {
        return await this.save(income);
    }

    public async updateIncome( income: UpdateIncomeDto) {
        return await this.update({id:income.id}, income);
    }

    public async removeIncome(incomeId: number[]) {
        return await this.delete(incomeId);
    }

    public async findAllByUserId(userId: number): Promise<Income[]> {
        console.log(`findAllByUserId: ${userId}` )
        return await this.find({where: {user: userId}});
    }
}
