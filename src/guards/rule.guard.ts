import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class RuleGuard implements CanActivate{

	constructor (
		private readonly reflector : Reflector,

	) {}

	async canActivate(context: ExecutionContext) {

		const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()]);

		if (!requiredRoles) {
			return true;
		}
		
		const {user} = context.switchToHttp().getRequest();

		requiredRoles.filter(role => user.role === role);

		return requiredRoles.length > 0;
		
		
	}

}