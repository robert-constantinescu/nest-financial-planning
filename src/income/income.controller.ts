import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    Request,
    UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import {IncomeService} from "./income.service";
import {CreateIncomeDto} from "./dto/create-income.dto";
import {Income} from "../entities/income.entity";
import {User} from "../user/user.decorator";
import {plainToClass} from "class-transformer";

@Controller('/api/income')
export class IncomeController {

    constructor(private incomeService: IncomeService) {
    }

    @Post()
    public async create( @Body() createIncomeDto: CreateIncomeDto, @User('userId') userId: number ): Promise<Income> {
        const income = plainToClass(Income, createIncomeDto);
        return await this.incomeService.create(income, userId);
    }

    @Post('list')
    @UseInterceptors(ClassSerializerInterceptor)
    public async saveIncomeList( @Body() incomeDtoList: CreateIncomeDto[], @User('userId') userId: number) {
        const incomeList = plainToClass(Income, incomeDtoList);
        return await this.incomeService.saveIncomeList(incomeList, userId);
    }

    @Get('list')
    public async retrieveIncomeList( @Request() request) {
        return this.incomeService.getIncomeList(request.user.userId)
    }

    @Delete('list')
    public async delete( @Body('ids') incomeIds: number[]): Promise<string> {
        return await this.incomeService.delete(incomeIds);
    }
}
