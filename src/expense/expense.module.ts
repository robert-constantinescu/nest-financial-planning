import {Module} from '@nestjs/common';
import {ExpenseService} from './expense.service';
import {ExpenseController} from './expense.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ExpenseRepository} from "./expense.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseRepository])],
  exports: [ExpenseService],
  controllers: [ExpenseController],
  providers: [ExpenseService]
})
export class ExpenseModule {}
