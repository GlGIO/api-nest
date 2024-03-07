import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Put,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateParcialUserDto } from "./dto/updateparcial-user.dto";

@Controller("users")
export class UserController {

	@Get()
	async findAll() {
		return { users: [] };
	}

	@Get(":id")
	async findOne(@Param() param) {
		return { user: {}, param };
	}

	@Post()
	async create(@Body() {email, name, password}: CreateUserDto) {
		return { email, name, password };
	}

	@Put(":id")
	async update(@Param("id", ParseIntPipe) id: number, @Body() {email,name,password}: UpdateUserDto) {
		return {
			method: "PUT",
			element: {email, name, password},
			id };
	}

	@Patch(":id")
	async updatePartial(@Param("id", ParseIntPipe) id: number, @Body() {email, name, password}: UpdateParcialUserDto) {
		return { elemente: {
			email,
			name,
			password
		}, id };
	}

	@Delete(":id")
	async remove(@Param("id", ParseIntPipe) id: number) {
		return { id };
	}
}
