import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/prisma';
import {
  CreateUnderdogDto,
  CreateUnderdogOutput,
} from './dto/create-underdog.dto';
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
      return {
        success: false,
        error: e.message,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} underdog`;
  }

  update(id: number, updateUnderdogDto: UpdateUnderdogDto) {
    return `This action updates a #${id} underdog`;
  }

  remove(id: number) {
    return `This action removes a #${id} underdog`;
  }
}
