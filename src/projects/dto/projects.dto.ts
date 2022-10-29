import { Project } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class ProjectsOutput extends DefaultOutput {
  projects?: Project[];
}
