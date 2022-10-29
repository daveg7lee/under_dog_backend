import { Category } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class CategoriesOutput extends DefaultOutput {
  readonly categories?: Category[];
}
