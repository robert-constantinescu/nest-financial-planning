import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(credentials: Credentials): Promise<any> {
    console.log('validatex');
    const user = await this.authService.validateUser( credentials );
    if (!user) {
      throw new UnauthorizedException('Username/password is wrong');
    }
    return user;
  }
}
