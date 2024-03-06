import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

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
	async create(@Body() body: CreateUserDto) {
		return { body };
	}

	@Put(":id")
	async update(@Param() param, @Body() body) {
		return { body, param };
	}

	@Patch(":id")
	async updatePartial(@Param() param, @Body() body) {
		return { body, param };
	}

	@Delete(":id")
	async remove(@Param() param) {
		return { param };
	}
}
