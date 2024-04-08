import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class AuthLoginDTO {

	@IsEmail()
		email: string;

	@IsString()
	@IsStrongPassword(
		{
			minLength: 6,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 0
		},
		{
			message: "Password is too weak",
		},
	)
		password: string;

}