import { Category } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class CreateCategoryDto {
  readonly title: string;
}

export class CreateCategoryOutput extends DefaultOutput {
  readonly category?: Category;
}
