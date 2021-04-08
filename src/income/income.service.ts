import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {IncomeRepository} from "./income.repository";
import {CreateIncomeDto} from "./dto/create-income.dto";
import {Income} from "../entities/income.entity";
import {ExtractJwt} from "passport-jwt";

@Injectable()
export class IncomeService {


    constructor(@InjectRepository(IncomeRepository) private incomeRepository: IncomeRepository) {
    }

    public async create(income: Income, userId: number): Promise<Income> {
        try {
            // let income = CreateIncomeDto.incomeEntityFromDto(incomeDto, userId)
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

    public async saveIncomeList(incomeList: Income[], userId): Promise<void> {
        try {
            for (let requestIncome of incomeList) {
                if (requestIncome.id.toString() == "") {
                    await this.create(requestIncome, userId)
                } else {
                    const incomeFromDb = await this.incomeRepository.findOne(requestIncome.id);
                    if (!requestIncome.equals(incomeFromDb)) {
                        await this.update(requestIncome);
                    }
                }
            }
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }


    public async getIncomeList(userId: number): Promise<Income[]> {
        try {
            return await this.incomeRepository.findAll(userId);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    private async update(requestIncome: Income) {
        return await this.incomeRepository.updateIncome(requestIncome);
    }
}
