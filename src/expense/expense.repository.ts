import {Injectable} from "@nestjs/common";
import {EntityRepository, getConnection, Repository} from "typeorm";
import {Expense} from "../entities/expense.entity";
import {CreateExpenseDto} from "../dto/create-expense.dto";
import {Recurrence} from "../common/constants/recurrence.enum";


@Injectable()
@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense> {

    public async addExpense(
        createExpenseDto: CreateExpenseDto,
    ): Promise<Expense> {
        const { amount, recurrence, userId, name } = createExpenseDto;
        const expense = new Expense();
        expense.userId = userId;
        expense.amount = amount;
        expense.name = name;
        expense.recurrence = Recurrence[recurrence];
        await this.save(expense);
        return expense;
    }


    public async removeExpenses(expenseIds: number[]) {
        return await getConnection().createQueryBuilder()
            .delete()
            .from(Expense)
            .where('Expense.id IN (:...ids)', {ids: expenseIds})
            .execute();
    }
}
