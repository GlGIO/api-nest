import { Controller } from "@nestjs/common";

import { AuthService } from "./Auth.service";

@Controller("")
export class AuthController {

	constructor(private readonly : AuthService) {}

}