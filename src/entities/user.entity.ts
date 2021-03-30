import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Income} from "./income.entity";
import {Expense} from "./expense.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Income, (income) => income.userId, )
    incomes: Promise<Income[]>

    @OneToMany(() => Expense, (expense) => expense.userId)
    expenses: Promise<Expense[]>
}


