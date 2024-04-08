import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateParcialUserDto } from "./dto/updateparcial-user.dto";
import * as bcrypt from "bcrypt";
import { SkipThrottle } from "@nestjs/throttler";

@Injectable()
export class UserService {

	constructor(private readonly prisma : PrismaService){}

	@SkipThrottle()
	async create(data : CreateUserDto){

		data.password = await bcrypt.hash(data.password, 10);
		
		const dataWithConvertedDate = {
			...data,
			birthDate: new Date(data.birthDate),
		};

		return await this.prisma.user.create({
			data: 
				dataWithConvertedDate,
			
		});
	}

	async findAll(){
		
		return await this.prisma.user.findMany();
	}

	async findOne(id: number){

		await this.exists(id);

		return await this.prisma.user.findUnique({
			where: {
				id
			}
		});
	}

	async update(id: number, {name,password,email,birthDate,role}: UpdateUserDto){

		await this.exists(id);

		password = await bcrypt.hash(password, 10);

		if(!birthDate) { 
			birthDate = null;
		}
		return await this.prisma.user.update({
			where: {
				id
			},
			data: {
				name,
				email,
				password,
				birthDate: birthDate ? new Date(birthDate) : null,
				role
				
			}
		});
	}

	async updatePartial(id: number, {name,password,email,birthDate, role}: UpdateParcialUserDto){
		
		await this.exists(id);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data:any = {};

		if(name) data.name = name;
		if(email) data.email = email;
		if(password) data.password =  await bcrypt.hash(password, 10);
		if(birthDate) data.birthDate = new Date(birthDate);
		if(role) data.role = role;
		

		return await this.prisma.user.update({
			where: {
				id
			},
			data,
		});
	}

	async remove(id: number){

		await this.exists(id);
		
		return await this.prisma.user.delete({
			where: {
				id
			}
		});
	}

	async exists(id: number){
		if(!(await this.prisma.user.count({
			where: {
				id
			}
		}))){
			throw new NotFoundException("User not found");
		}
	}
}