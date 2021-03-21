import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: Credentials): Promise<any> {
    const user = await this.userService.findOne(credentials.username);
    if (user && user.password === credentials.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(credentials: Credentials) {
    const payload = { username: credentials.username, sub: credentials.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
