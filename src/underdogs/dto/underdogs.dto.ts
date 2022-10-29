import { UnderDog } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class UnderdogsOutput extends DefaultOutput {
  underdogs?: UnderDog[];
}
