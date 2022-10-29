import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma';
import { CategoriesOutput } from './dto/categories.dto';
import {
  CreateCategoryDto,
  CreateCategoryOutput,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  async create({ title }: CreateCategoryDto): Promise<CreateCategoryOutput> {
    try {
      const exists = await prisma.category.findUnique({ where: { title } });

      if (exists) {
        throw new Error('이미 존재하는 카테고리입니다.');
      }

      const category = await prisma.category.create({ data: { title } });

      return { success: true, category };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  async findAll(): Promise<CategoriesOutput> {
    try {
      const categories = await prisma.category.findMany();

      return {
        success: true,
        categories,
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
