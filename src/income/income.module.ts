import {Module} from '@nestjs/common';
import {IncomeController} from './income.controller';
import {IncomeService} from './income.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Income} from "../entities/income.entity";
import {UserModule} from "../user/user.module";
import {IncomeRepository} from "./income.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Income, IncomeRepository]), UserModule],
  exports: [IncomeService],
  controllers: [IncomeController],
  providers: [IncomeService]
})
export class IncomeModule {}
