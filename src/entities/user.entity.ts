import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Income} from "./income.entity";

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

    @OneToMany(() => Income, (income) => income.userId, {eager: true})
    incomes: Promise<Income[]>
}


