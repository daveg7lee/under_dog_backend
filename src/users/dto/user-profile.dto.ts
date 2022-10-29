import { User } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class UserProfileOutput extends DefaultOutput {
  readonly user?: User;
}
