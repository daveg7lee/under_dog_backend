import { Project } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class ProjectOutput extends DefaultOutput {
  project?: Project;
}
