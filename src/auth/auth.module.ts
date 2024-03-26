import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [JwtModule.register({
		secret: "vd/et-CJY49jPWF{uSq.%@@b;*LDnN?35"
	})],
	controllers: [],
	providers: [],
	exports: []
})

export class AuthModule {}