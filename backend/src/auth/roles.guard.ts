import {CanActivate, ExecutionContext, Injectable,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/user.entity';
import { ROLES_KEY } from './roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      // 1. On récupère les rôles attendus depuis la route
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
  
      // 2. On récupère l'utilisateur depuis la requête (injecté par JwtStrategy)
      const { user } = context.switchToHttp().getRequest();
      console.log('🧪 Roles attendus :', requiredRoles);
      console.log('🧪 Utilisateur reçu :', user);
      
      if (!user) {
        console.log('❌ riuen dans user');
        return false;
      }
  
      // 3. On vérifie si le rôle de l'utilisateur est autorisé
      return requiredRoles.includes(user.role);

    }
  }
  