import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

		const dt = Date.now();
		return next.handle().pipe(tap(() =>{

			console.log(`Request: ${context.switchToHttp().getRequest().url}`);
			
			console.log( `Request time: ${Date.now() - dt}ms`);
		}));
	}

}