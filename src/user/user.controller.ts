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
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll() {
		return this.userService.findAll();
	}

	@Get(":id")
	async findOne(@Param ("id", ParseIntPipe) id: number,) {
		return this.userService.findOne(id);
	}

	@Post()
	async create(@Body() data: CreateUserDto) {
		return this.userService.create(data);
	}

	@Put(":id")
	async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
		return this.userService.update(id, data);
	}

	@Patch(":id")
	async updatePartial(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateParcialUserDto) {
		return this.userService.updatePartial(id, data);
	}

	@Delete(":id")
	async remove(@Param("id", ParseIntPipe) id: number) {
		return { id };
	}
}
