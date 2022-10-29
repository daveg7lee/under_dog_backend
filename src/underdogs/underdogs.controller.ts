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
import { UnderdogsService } from './underdogs.service';
import { CreateUnderdogDto } from './dto/create-underdog.dto';
import { UpdateUnderdogDto } from './dto/update-underdog.dto';
import { Auth } from 'src/auth/auth.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from '@prisma/client';

@Controller('underdogs')
export class UnderdogsController {
  constructor(private readonly underdogsService: UnderdogsService) {}

  @Auth(['Any'])
  @Post()
  create(@Body() createUnderdogDto: CreateUnderdogDto, @AuthUser() user: User) {
    return this.underdogsService.create(createUnderdogDto, user);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.underdogsService.findOne(name);
  }

  @Get('search')
  search(@Query('name') name: string) {
    return this.underdogsService.search(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnderdogDto: UpdateUnderdogDto,
  ) {
    return this.underdogsService.update(+id, updateUnderdogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.underdogsService.remove(+id);
  }
}
