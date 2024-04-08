import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword,  } from "class-validator";
import { Role } from "src/enums/role.enum";

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

	@IsOptional()
	@IsEnum(Role)
		role : string;
}
