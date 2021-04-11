import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from "../dto/create-user.dto";


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: Credentials): Promise<any> {
    const user = await this.userService.findByUsername(credentials.username);
    if (user && user.password === credentials.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(credentials: Credentials) {
    const user = await this.userService.findByUsername(credentials.username);
    if (user && user.password ===  credentials.password) {
      const payload = { username: credentials.username, sub: user.id};
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new HttpException('Wrong username and/or password', HttpStatus.UNAUTHORIZED);
  }

  async createUser(credentials: Credentials) {
    if (await this.userService.usernameExist(credentials.username)) {
      throw new HttpException('Username is already used', HttpStatus.NOT_ACCEPTABLE)
    }
    return await this.userService.create(CreateUserDto.fromCredentials(credentials));
  }
}
