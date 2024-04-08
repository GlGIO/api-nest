import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { LogInterceptor } from "./interceptors/log.interceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//cors servem para bloquear chamadas de domínios diferentes
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new LogInterceptor());

	await app.listen(8000);
}
bootstrap();
