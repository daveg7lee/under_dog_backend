import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Auth } from 'src/auth/auth.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from '@prisma/client';
import { FundDto } from './dto/fund.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Auth(['Any'])
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @AuthUser() user) {
    return this.projectsService.create(createProjectDto, user);
  }

  @Get('/category/:category')
  findByCategory(@Param('category') category: string) {
    return this.projectsService.findByCategory(category);
  }

  @Auth(['Any'])
  @Get('/underdog/:id')
  findByUnderdog(@Param('id') id: string, @AuthUser() user: User) {
    return this.projectsService.findByUnderdog(+id, user);
  }

  @Auth(['Any'])
  @Post('/:id/fund')
  fund(
    @Param('id') id: string,
    @AuthUser() user: User,
    @Body() fundDto: FundDto,
  ) {
    return this.projectsService.fund(+id, user, fundDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Get('/search')
  search(@Query('title') title: string) {
    return this.projectsService.search(title);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
