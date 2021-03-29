import {Module} from '@nestjs/common';
import {IncomeController} from './income.controller';
import {IncomeService} from './income.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {IncomeRepository} from "./income.repository";

@Module({
  imports: [TypeOrmModule.forFeature([IncomeRepository])],
  exports: [IncomeService],
  controllers: [IncomeController],
  providers: [IncomeService]
})
export class IncomeModule {}
