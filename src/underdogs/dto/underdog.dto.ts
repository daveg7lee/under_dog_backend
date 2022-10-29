import { UnderDog } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class UnderdogOutput extends DefaultOutput {
  underdog?: UnderDog;
}
