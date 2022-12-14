import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from 'src/auth/auth.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from '@prisma/client';
import { ChargeDto } from './dto/charge.dto';
import prisma from 'src/prisma';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Auth(['Any'])
  @Post('charge')
  charge(@Body() chargeDto: ChargeDto, @AuthUser() user: User) {
    return this.usersService.charge(chargeDto, user);
  }

  @Auth(['Any'])
  @Get('me')
  me(@AuthUser() user: User) {
    return prisma.user.findUnique({
      where: { id: user.id },
      include: {
        underdog: true,
        invests: { include: { project: { include: { author: true } } } },
      },
    });
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
