import {Body,Controller,Delete,Get,Patch,Post,Put} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateParcialUserDto } from "./dto/updateparcial-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorato";

@Controller("users")
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll() {
		return this.userService.findAll();
	}

	@Get(":id")
	async findOne(@ParamId() id: number,) {
		return this.userService.findOne(id);
	}

	@Post()
	async create(@Body() data: CreateUserDto) {
		return this.userService.create(data);
	}

	@Put(":id")
	async update(@ParamId() id: number, @Body() data: UpdateUserDto) {
		return this.userService.update(id, data);
	}

	@Patch(":id")
	async updatePartial(@ParamId() id: number, @Body() data: UpdateParcialUserDto) {
		return this.userService.updatePartial(id, data);
	}

	@Delete(":id")
	async remove(@ParamId() id: number) {
		return this.userService.remove(id);
	}
}
