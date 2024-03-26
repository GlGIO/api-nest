import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

	constructor(private readonly JWTService: JwtService) {}

	async generateToken(payload: string) {
		return this.JWTService.sign(payload);
	}

	async validateToken(token: string) {
		try {
			return this.JWTService.verify(token);
		} catch (error) {
			return null;
		}
	}
}