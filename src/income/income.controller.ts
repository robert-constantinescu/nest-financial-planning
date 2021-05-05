import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Request} from '@nestjs/common';
import {IncomeService} from "./income.service";
import {CreateIncomeDto} from "../dto/create-income.dto";
import {Income} from "../entities/income.entity";
import {User} from "../user/user.decorator";
import {DeleteResult} from "typeorm";

@Controller('/income')
export class IncomeController {

    constructor(private incomeService: IncomeService) {
    }

    @Post()
    public async create( @Body() createIncomeDto: CreateIncomeDto, @User('userId') userId: number ): Promise<Income> {
        try {
            const income = CreateIncomeDto.incomeEntityFromDto(createIncomeDto, userId);
            return await this.incomeService.create(income, userId);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('list')
    public async saveIncomeList( @Body() incomeDtoList: CreateIncomeDto[], @User('userId') userId: number) {
        const incomeList: Income[] = []
        incomeDtoList.forEach(incomeDto => incomeList.push(CreateIncomeDto.incomeEntityFromDto(incomeDto, userId)));
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
