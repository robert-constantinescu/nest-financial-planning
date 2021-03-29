import {Controller, Get, Param, Post, Body} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "../entities/user.entity";
import {NoAuth} from "../auth/no-auth.decorator";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('/api/user')
export class UserController {

    constructor(private userService: UserService) {  }

    @Get()
    public async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get('/:username')
    public async findOneByUsername(@Param('username') username: string): Promise<User> {
        return await this.userService.findByUsername(username);
    }

    @Get('/:userId')
    public async findOneById(@Param('userId') userId: number): Promise<User> {
        return await this.userService.findById(userId);
    }

    @Post()
    @NoAuth()
    public async create( @Body() createUserDto: CreateUserDto ): Promise<User> {
        return await this.userService.create(createUserDto);
    }

}
