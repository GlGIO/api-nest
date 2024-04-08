import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

	constructor(
		private readonly JWTService: JwtService, 
		private readonly prisma: PrismaService,
		private readonly userService: UserService
	) {}

	generateToken(user: User) {
		return {
			acess_token: this.JWTService.sign({
				sub: user.id,
				email: user.email
			},
			{
				expiresIn: "7 days"
			}
			),
		};

	}

	validateToken(token: string) {
		try {
			return this.JWTService.verify(token);

		} catch (error) {
			throw new UnauthorizedException(error.message || "Invalid token");
		}
	}

	isValidToken(token: string) {
		try {
			this.validateToken(token);
			return true;
		} catch (error) {
			return false;
		}
	}


	async login(email: string, password: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				email,
			}
		});

		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		if (await bcrypt.compare(password, user.password)){
			throw new UnauthorizedException("Invalid credentials");
		}

		return this.generateToken(user);
	}

	async forget(email: string) {
		const user = this.prisma.user.findFirst({
			where: {
				email
			}
		});

		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		//TODO: Send email with reset link

		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async reset(password: string, token:string) {

		//verificar se o token é valido

		const id = 0;

		const user = await this.prisma.user.update({
			where:{
				id
			},
			data:{
				password
			}
		});

		return this.generateToken(user);

	}

	async register(data: AuthRegisterDTO) {

		const user = await this.userService.create(data);
		
		return this.generateToken(user);

	}

	async me(token: string) {

		const { sub } = await this.validateToken(token);

		const user = await this.prisma.user.findUnique({
			where: {
				id: sub
			}
		});

		if (!user) {
			throw new UnauthorizedException("Invalid token");
		}

		return user;
	}

}