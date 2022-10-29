import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/prisma';
import { DefaultOutput } from 'src/shared/shared.dto';
import {
  CreateProjectDto,
  CreateProjectOutput,
} from './dto/create-project.dto';
import { FundDto } from './dto/fund.dto';
import { ProjectOutput } from './dto/project.dto';
import { ProjectsOutput } from './dto/projects.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  async create(
    { title, detail, goal_amount, categoryId }: CreateProjectDto,
    user: User,
  ): Promise<CreateProjectOutput> {
    try {
      const isLeader = await prisma.underDog.findUnique({
        where: { userId: user.id },
      });

      if (!isLeader) {
        throw new Error('프로젝트 등록은 언더독 대표만 가능합니다!');
      }

      const project = await prisma.project.create({
        data: {
          title,
          detail,
          goal_amount: +goal_amount,
          category: { connect: { id: +categoryId } },
          author: { connect: { userId: user.id } },
        },
      });

      return { success: true, project };
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

  async getRecommended(): Promise<ProjectsOutput> {
    try {
      const projects = await prisma.project.findMany({
        include: { author: true },
      });

      return {
        success: true,
        projects: projects.slice(0, 12),
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  async findByUnderdog(id: number, user: User): Promise<ProjectsOutput> {
    try {
      const underdog = await prisma.underDog.findUnique({
        where: { id },
        include: { leader: true },
      });

      if (underdog.leader.id !== user.id) {
        throw new Error('해당 언더독의 대표만 확인할 수 있는 정보입니다.');
      }

      const projects = await prisma.project.findMany({
        where: { underDogId: id },
      });

      return {
        success: true,
        projects,
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async findAll(): Promise<ProjectsOutput> {
    try {
      const projects = await prisma.project.findMany({
        include: { author: true },
      });

      return {
        success: true,
        projects,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  async findByCategory(categoryTitle: string): Promise<ProjectsOutput> {
    try {
      const category = await prisma.category.findUnique({
        where: { title: categoryTitle },
      });

      if (!category) {
        throw new Error('존재하지 않는 카테고리입니다');
      }

      const projects = await prisma.project.findMany({
        where: { categoryId: category.id },
      });

      return {
        success: true,
        projects,
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async search(title: string): Promise<ProjectsOutput> {
    try {
      const projects = await prisma.project.findMany({
        where: { title: { startsWith: title } },
      });

      return {
        success: true,
        projects,
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async fund(
    id: number,
    user: User,
    { amount }: FundDto,
  ): Promise<DefaultOutput> {
    try {
      if (user.points < amount) {
        throw new Error('포인트가 부족합니다.');
      }

      const project = await prisma.project.findUnique({ where: { id } });

      await prisma.project.update({
        where: { id },
        data: { current_amount: +project.current_amount + +amount },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { points: +user.points - +amount },
      });

      await prisma.inveset.create({
        data: {
          project: { connect: { id: project.id } },
          investor: { connect: { id: user.id } },
          amount: +amount,
        },
      });

      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async findOne(id: number): Promise<ProjectOutput> {
    try {
      const project = await prisma.project.findUnique({
        where: { id },
        include: { author: true, investors: { include: { investor: true } } },
      });

      if (!project) {
        throw new Error('프로젝트를 찾을 수 없습니다.');
      }

      return {
        success: true,
        project,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
