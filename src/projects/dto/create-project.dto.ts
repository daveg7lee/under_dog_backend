import { Project } from '@prisma/client';
import { DefaultOutput } from 'src/shared/shared.dto';

export class CreateProjectDto {
  readonly title: string;
  readonly detail: string;
  readonly goal_amount: number;
  readonly categoryId: number;
  readonly ticket_price: number;
  readonly fundingDueDate: string;
  readonly fundingReward: string;
}

export class CreateProjectOutput extends DefaultOutput {
  readonly project?: Project;
}
