import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {IncomeRepository} from "./income.repository";
import {CreateIncomeDto} from "./dto/create-income.dto";
import {Income} from "../entities/income.entity";

@Injectable()
export class IncomeService {


    constructor(@InjectRepository(IncomeRepository) private incomeRepository: IncomeRepository) {
    }

    async create(createIncomeDto: CreateIncomeDto): Promise<Income> {
        try {
            return this.incomeRepository.addIncome(createIncomeDto);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }

    }

    public async remove(incomeId: number): Promise<string> {
        try {
            await this.incomeRepository.removeIncome(incomeId);
            return "Successfully deleted income"
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}
