import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {IncomeRepository} from "./income.repository";
import {Income} from "../entities/income.entity";
import {DeleteResult} from "typeorm";

@Injectable()
export class IncomeService {


    constructor(@InjectRepository(IncomeRepository) private incomeRepository: IncomeRepository) {
    }

    public async create(income: Income, userId: number): Promise<Income> {
        try {
            const newIncome = await this.incomeRepository.addIncome(income);
            return newIncome;
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }

    }

    public async delete(incomeId: number[]): Promise<string> {
        try {
            await this.incomeRepository.removeIncome(incomeId);
            return "Incomes were deleted successfully";
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async saveIncomeList(incomeList: Income[], userId): Promise<void> {
        try {
            for (let requestIncome of incomeList) {
                if (requestIncome.id == null) {
                    requestIncome.id = 0;
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
            const incomeList = await this.incomeRepository.findAll(userId);
            return incomeList;
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async update(requestIncome: Income) {
        try {
            return await this.incomeRepository.updateIncome(requestIncome);
        }catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

}
