import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
import {IncomeService} from "./income.service";
import {CreateIncomeDto} from "./dto/create-income.dto";
import {Income} from "../entities/income.entity";

@Controller('/api/income')
export class IncomeController {

    constructor(private incomeService: IncomeService) {
    }

    @Post()
    public async create( @Body() createIncomeDto: CreateIncomeDto ): Promise<Income> {
        return await this.incomeService.create(createIncomeDto);
    }

    @Delete('/:incomeId')
    public async delete( @Param('incomeId') incomeId: number): Promise<string> {
        return await this.incomeService.remove(incomeId);
    }
}
