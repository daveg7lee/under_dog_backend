import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileOutput } from './dto/user-profile.dto';
import { LoginDto, LoginOutput } from './dto/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { ChargeDto, ChargeOutput } from './dto/charge.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  async create({
    name,
    email,
    password,
  }: CreateUserDto): Promise<CreateUserOutput> {
    try {
      const exists = await prisma.user.findUnique({ where: { email } });

      if (exists) {
        throw new Error('이미 존재하는 유저입니다!');
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, email, password: encryptedPassword },
      });

      return {
        success: true,
        user,
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async charge({ amount }: ChargeDto, user: User): Promise<ChargeOutput> {
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { points: user.points + amount },
      });

      return {
        success: true,
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async login({ email, password }: LoginDto): Promise<LoginOutput> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error('존재하지 않는 유저입니다!');
      }

      const passwordCorrect = await await bcrypt.compare(
        password,
        user.password,
      );

      if (!passwordCorrect) {
        return {
          success: false,
          error: 'Wrong password',
        };
      }

      const token = this.jwtService.sign(user.id);

      return {
        success: true,
        token,
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new Error('유저가 존재하지 않습니다!');
      }

      return { success: true, user };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
