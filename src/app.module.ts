import { Module, forwardRef } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ThrottlerModule.forRoot([
			{
				ttl: 60,
				limit: 10,
			}
		]),
		forwardRef(() => UserModule ),
		forwardRef(() => AuthModule )

	],
	controllers: [AppController],
	providers: [AppService,{ provide: APP_GUARD, useClass: ThrottlerGuard }],
	exports: [AppService],
})
export class AppModule {}
