import { PartialType } from '@nestjs/mapped-types';
import { CreateUnderdogDto } from './create-underdog.dto';

export class UpdateUnderdogDto extends PartialType(CreateUnderdogDto) {}
