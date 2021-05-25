import {Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Request} from '@nestjs/common';
import {IncomeService} from "./income.service";
import {CreateIncomeDto} from "../dto/create-income.dto";
import {Income} from "../entities/income.entity";
import {User} from "../user/user.decorator";
import {UpdateIncomeDto} from "../dto/update-income.dto";
import {ArrayValidationPipe} from "../common/pipes/ArrayValidationPipe";

@Controller('/income')
export class IncomeController {

    constructor(private readonly incomeService: IncomeService) {
    }

    @Post()
    public async create(@Body() createIncomeDto: CreateIncomeDto, @User() userId): Promise<Income> {
        console.log(createIncomeDto instanceof CreateIncomeDto)
        try {
            return await this.incomeService.create(createIncomeDto, userId);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('list')
    public async newIncomesList(
        @Body(ArrayValidationPipe(CreateIncomeDto)) incomeDtoList: CreateIncomeDto[],
        @User('userId') userId: number)
    {
        return await this.incomeService.createNewIncomesList(incomeDtoList, userId);
    }

    @Patch('list')
    public async updateIncomeList(@Body() updateIncomeDtoList: UpdateIncomeDto[]) {
        return await this.incomeService.updateIncomeList(updateIncomeDtoList);
    }

    @Get('list')
    public async getIncomeList( @Request() request) {
        return this.incomeService.getIncomeList(request.user.userId)
    }

    @Delete('list')
    public async delete( @Body('ids') incomeIds: number[]): Promise<string> {
        return await this.incomeService.delete(incomeIds);
    }
}
