import { UnderDog } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class CreateUnderdogDto {
  readonly members: string;
  readonly experiences: string;
  readonly scenario: string;
  readonly ability: string;
  readonly bio: string;
}

export class CreateUnderdogOutput extends DefaultOutput {
  readonly underdog?: UnderDog;
}
