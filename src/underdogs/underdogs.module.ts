import { Module } from '@nestjs/common';
import { UnderdogsService } from './underdogs.service';
import { UnderdogsController } from './underdogs.controller';

@Module({
  controllers: [UnderdogsController],
  providers: [UnderdogsService]
})
export class UnderdogsModule {}
