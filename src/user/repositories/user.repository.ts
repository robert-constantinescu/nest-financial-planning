import {EntityRepository, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../../dto/create-user.dto";
import {User} from "../../entities/user.entity";


@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async findAll(): Promise<User[]> {
        return await this.find({});
    }

    public async findOneByUserId(userId: number): Promise<User> {
        return await this.findOne(userId);
    }

    public async createUser(
        createUserDto: CreateUserDto,
    ): Promise<User> {
        const { username, email, password } = createUserDto;
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = password;

        await this.save(user);
        return user;
    }

    public async findOneByUsername(username: string) {
        return await this.findOne({where: {username: username}});
    }

}
