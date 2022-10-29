import { SetMetadata } from '@nestjs/common';
import { Role as UserRole } from '@prisma/client';

export type AllowedRole = keyof typeof UserRole | 'Any';

export const Role = (roles: AllowedRole[]) => SetMetadata('roles', roles);
