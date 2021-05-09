import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./repositories/user.repository";
import {User} from "../entities/user.entity";


@Injectable()
export class UserService {

  constructor(
      @InjectRepository(UserRepository) private readonly userRepository: UserRepository
  ) {
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async findByUsername(username: string): Promise<User> {
    if (!await this.usernameExist(username)) {
      throw new NotFoundException(`User #${username} not found`);
    }
    return await this.userRepository.findOneByUsername(username);
  }

  public async findById(userId: number): Promise<User> {
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

  public async usernameExist(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneByUsername(username);
    return user !== undefined;
}


}
