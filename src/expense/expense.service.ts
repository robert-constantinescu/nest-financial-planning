import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ExpenseRepository} from "./expense.repository";
import {CreateExpenseDto} from "./dto/create-expense.dto";
import {Expense} from "../entities/expense.entity";

@Injectable()
export class ExpenseService {

    constructor(@InjectRepository(ExpenseRepository) private expenseRepository: ExpenseRepository) {
    }

    public async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
        try {
            return await this.expenseRepository.addExpense(createExpenseDto);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }

    }

    public async remove(expenseIds: number[]): Promise<string> {
        try {
            await this.expenseRepository.removeExpenses(expenseIds);
            return "Successfully deleted expense"
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
    
    
}
