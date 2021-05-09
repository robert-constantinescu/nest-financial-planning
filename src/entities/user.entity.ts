import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Income} from "./income.entity";
import {Expense} from "./expense.entity";
import {Exclude} from "class-transformer";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    @Exclude() //use this to hide data
    password: string;

    @OneToMany(() => Income, (income) => income.user, )
    incomes: Income[]

    @OneToMany(() => Expense, (expense) => expense.userId)
    expenses: Promise<Expense[]>
}


