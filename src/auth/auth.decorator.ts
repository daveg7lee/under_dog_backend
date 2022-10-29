import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AllowedRole, Role } from './role.decorator';

export function Auth(roles: AllowedRole[]) {
  return applyDecorators(Role(roles), UseGuards(AuthGuard));
}
