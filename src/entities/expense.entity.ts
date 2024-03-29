import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Recurrence} from "../common/constants/recurrence.enum";
import {User} from "./user.entity";

@Entity()
export class Expense {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.incomes, {primary: true})
    @JoinColumn({name: 'user_id'})
    userId: number;

    @Column()
    amount: number;

    @Column({nullable: true})
    name: string;

    @Column()
    recurrence: Recurrence;
}
