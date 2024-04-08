import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/pirsma.module";
import { AuthService } from "./Auth.service";
import { UserService } from "src/user/user.service";

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
		}),
		forwardRef(() => UserModule),
		PrismaModule
	],
	controllers: [AuthController],
	providers: [AuthService, UserService],
	exports: [AuthService]
})

export class AuthModule {}