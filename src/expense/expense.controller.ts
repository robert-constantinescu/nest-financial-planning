import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
import {ExpenseService} from './expense.service';
import {CreateExpenseDto} from "./dto/create-expense.dto";
import {Expense} from "../entities/expense.entity";

@Controller('/api/expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}


  @Post()
  public async create( @Body() createExpenseDto: CreateExpenseDto ): Promise<Expense> {
    return await this.expenseService.create(createExpenseDto);
  }

  @Delete()
  public async delete( @Body('expenseIds') expenseIds: number[]): Promise<string> {
    return await this.expenseService.remove(expenseIds);
  }
}
