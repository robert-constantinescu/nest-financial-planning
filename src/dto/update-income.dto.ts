import {CreateIncomeDto} from "./create-income.dto";
import {PartialType} from "@nestjs/mapped-types";

export class UpdateIncomeDto extends PartialType(CreateIncomeDto){}