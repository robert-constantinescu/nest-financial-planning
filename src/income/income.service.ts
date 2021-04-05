import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {IncomeRepository} from "./income.repository";
import {CreateIncomeDto} from "./dto/create-income.dto";
import {Income} from "../entities/income.entity";

@Injectable()
export class IncomeService {


    constructor(@InjectRepository(IncomeRepository) private incomeRepository: IncomeRepository) {
    }

    public async create(incomeDto: CreateIncomeDto): Promise<Income> {
        try {
            let income = CreateIncomeDto.incomeEntityFromDto(incomeDto)
            return await this.incomeRepository.addIncome(income);
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

    public async saveIncomeList(incomeDtoList: CreateIncomeDto[]) {
        try {
            for (let incomeDto of incomeDtoList) {
                let income = CreateIncomeDto.incomeEntityFromDto(incomeDto)
                await this.incomeRepository.addIncome(income);
            }
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }


}
