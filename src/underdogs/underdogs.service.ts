import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/prisma';
import {
  CreateUnderdogDto,
  CreateUnderdogOutput,
} from './dto/create-underdog.dto';
import { UnderdogOutput } from './dto/underdog.dto';
import { UnderdogsOutput } from './dto/underdogs.dto';
import { UpdateUnderdogDto } from './dto/update-underdog.dto';

@Injectable()
export class UnderdogsService {
  async create(
    createUnderdogDto: CreateUnderdogDto,
    user: User,
  ): Promise<CreateUnderdogOutput> {
    try {
      const exists = await prisma.underDog.findUnique({
        where: { userId: user.id },
      });

      if (exists) {
        throw new Error('이미 언더독의 리더입니다.');
      }

      const underdog = await prisma.underDog.create({
        data: {
          leader: { connect: { id: user.id } },
          ...createUnderdogDto,
        },
      });

      return {
        success: true,
        underdog,
      };
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async search(name: string): Promise<UnderdogsOutput> {
    try {
      const underdogs = await prisma.underDog.findMany({
        where: { name: { startsWith: name } },
      });

      return {
        success: true,
        underdogs,
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async findOne(name: string): Promise<UnderdogOutput> {
    try {
      const underdog = await prisma.underDog.findUnique({
        where: { name },
        include: { projects: { include: { author: true } } },
      });

      return {
        success: true,
        underdog,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  update(id: number, updateUnderdogDto: UpdateUnderdogDto) {
    return `This action updates a #${id} underdog`;
  }

  remove(id: number) {
    return `This action removes a #${id} underdog`;
  }
}
