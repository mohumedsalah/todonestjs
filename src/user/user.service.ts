import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';
import { comparePassword, hashPassword } from '../helper/authorize';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}
  async register(username: string, password: string) {
    const newUser = new this.userModel({
      username,
      password: hashPassword(password)
    });
    const result = await newUser.save();

    return this.getToken(result.id, result.username);
  }
  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user || !comparePassword(password, user.password)) {
      throw new NotFoundException('Could not find todo.');
    }

    return this.getToken(user.id, user.username);
  }

  private getToken(id: string, username: string): string {
    const result = this.jwtService.sign({ id, username });
    return result;
  }
}
