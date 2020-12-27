import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import bcrypt from 'bcrypt';
const saltRounds = 10;

import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}
  async register(username: string, password: string) {
    const newUser = new this.userModel({
      username,
      password: this.hashPassword(password)
    });
    const result = await newUser.save();

    return this.getToken(result.id, result.username);
  }
  async login(username, password) {
    const user = await this.userModel.findOne({ username });
    if (!user || this.comparePassword(password, user.password)) {
      throw new NotFoundException('Could not find product.');
    }

    return this.getToken(user.id, user.username);
  }

  private getToken(id: string, username: string): string {
    const result = this.jwtService.sign({ id, username });
    return result;
  }
  private comparePassword(Password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(Password, hashedPassword);
  }

  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}
