import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateParcialUserDto } from "./dto/updateparcial-user.dto";


@Injectable()
export class UserService {

	constructor(private readonly prisma : PrismaService){}

	async create(data : CreateUserDto){
		
		const dataWithConvertedDate = {
			...data,
			birthDate: new Date(data.birthDate),
		};

		return await this.prisma.user.create({
			data: 
				dataWithConvertedDate,
			
			select: {
				id: true,
				name: true
			}
		});
	}

	async findAll(){
		return await this.prisma.user.findMany();
	}

	async findOne(id: number){
		return await this.prisma.user.findUnique({
			where: {
				id
			}
		});
	}

	async update(id: number, {name,password,email,birthDate}: UpdateUserDto){

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
				birthDate: birthDate ? new Date(birthDate) : null
				
			}
		});
	}

	async updatePartial(id: number, {name,password,email,birthDate}: UpdateParcialUserDto){

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data:any = {};

		if(name) data.name = name;
		if(email) data.email = email;
		if(password) data.password = password;
		if(birthDate) data.birthDate = new Date(birthDate);
		

		return await this.prisma.user.update({
			where: {
				id
			},
			data,
		});
	}
}