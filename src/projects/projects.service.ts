import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/prisma';
import {
  CreateProjectDto,
  CreateProjectOutput,
} from './dto/create-project.dto';
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
          goal_amount,
          category: { connect: { id: categoryId } },
          author: { connect: { userId: user.id } },
        },
      });

      return { success: true, project };
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

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
