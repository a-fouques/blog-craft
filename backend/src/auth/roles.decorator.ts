import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/user.entity'

// On utilise SetMetadata pour ajouter des données à une route
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
