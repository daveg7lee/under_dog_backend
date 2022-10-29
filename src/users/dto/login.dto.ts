import { DefaultOutput } from 'src/shared/shared.dto';

export class LoginDto {
  readonly email: string;
  readonly password: string;
}

export class LoginOutput extends DefaultOutput {
  token?: string;
}
