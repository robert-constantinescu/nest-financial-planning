import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./repositories/user.repository";
import {User} from "../entities/user.entity";


@Injectable()
export class UserService {

  constructor(
      @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException(`User #${username} not found`);
    }
    return user;
  }

  public async findById(userId: number) {
    const user = await this.userRepository.findOneByUserId(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  public async create(
      createUserDto: CreateUserDto,
  ): Promise<User> {
    try {
      return await this.userRepository.createUser(createUserDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }


}
