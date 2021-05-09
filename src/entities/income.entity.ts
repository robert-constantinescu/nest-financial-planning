import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Recurrence} from "../common/constants/recurrence.enum";
import {User} from "./user.entity";

@Entity()
export class Income {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.incomes)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({name: 'current_amount'})
    currentAmount: number;

    @Column({name: 'goal_amount', nullable: true})
    goalAmount: number;

    @Column({name: 'yearly_amount', nullable: true})
    yearlyAmount: number;

    @Column({nullable: true})
    type: string;

    @Column()
    recurrence: Recurrence;


    public equals(incomeToCompare: Income): boolean{
        let properties = Object.getOwnPropertyNames(this)
        for (let property of properties) {
            if (this[property] !== incomeToCompare[property]) {
                return false;
            }
        }
        return true;
    }
}
