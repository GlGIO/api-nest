import { IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword,  } from "class-validator";

export class CreateUserDto {

	@IsString()
		name: string;

	@IsEmail()
		email: string;

	@IsOptional()
	@IsDateString()
		birthDate: string;

	@IsStrongPassword({
		minLength: 6,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 0
	})
		password: string;
}
