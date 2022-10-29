import { User } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly avatarUrl: string;
}

export class CreateUserOutput extends DefaultOutput {
  user?: User;
}
