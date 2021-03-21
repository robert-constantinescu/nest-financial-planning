import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'richie',
      password: 'admin',
    },
    {
      userId: 2,
      username: 'basti',
      password: 'admin',
    },
    {
      userId: 3,
      username: 'ares',
      password: 'admin',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
