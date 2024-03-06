import { Body, Controller, Post } from "@nestjs/common";

@Controller("users ")
export class UserController {

	@Post()
	async create(@Body() user) {
		return { user };
	}

}
