import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IncomeRepository} from "./income.repository";
import {Income} from "../entities/income.entity";
import {CreateIncomeDto} from "../dto/create-income.dto";
import {UpdateIncomeDto} from "../dto/update-income.dto";
import {UserService} from "../user/user.service";
import {getRepository} from "typeorm";
import {User} from "../entities/user.entity";
import {type} from "os";

@Injectable()
export class IncomeService {


    constructor(
        private readonly incomeRepository: IncomeRepository,
        private readonly userService: UserService) {
    }

    public async create(incomeDto: CreateIncomeDto, userId: number): Promise<Income> {
        try {
            console.log('create');
            let user;
            Promise.resolve(this.userService.findById(userId)).then(userFromPromise => user = userFromPromise);
            const income = this.incomeRepository.create(
                {...incomeDto, user: user}
            );
            console.log('create')
            return await this.incomeRepository.save(income);
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

    public async createNewIncomesList(incomeDtoList: CreateIncomeDto[], userId): Promise<void> {
        try {
            for (let incomeDto of incomeDtoList) {
                console.log('create income')
                await this.create(incomeDto, userId)
            }
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async updateIncomeList(incomeDtoList: UpdateIncomeDto[]){
        for (let dto of incomeDtoList ) {
            await this.update(dto);
        }
    }


    public async getIncomeList(userId: number): Promise<Income[]> {
        try {
            return this.incomeRepository.findAllByUserId(userId);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async update(updateIncomeDto: UpdateIncomeDto) {
        const existingIncome = await this.incomeRepository.preload({
            id: +updateIncomeDto.id,
            ...updateIncomeDto
        })
        if (!existingIncome) {
            throw new HttpException(`Income with ${updateIncomeDto.id} was not found`, HttpStatus.NOT_FOUND)
        }
        try {
            return await this.incomeRepository.updateIncome(updateIncomeDto);
        }catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

}
