import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/Auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate{

	constructor (
		private readonly authService: AuthService,
		private readonly userService: UserService,

	) {}

	async canActivate(context: ExecutionContext) {
		
		const request = context.switchToHttp().getRequest();
		const { authorization } = request.headers;

		try {

			const data = this.authService.validateToken((authorization).split(" ")[1]);

			request.tokenPayload = data;

			request.user=  await this.userService.findOne(data.sub);

			return true;
		} catch (error) {
			return false;
		}
	}

}