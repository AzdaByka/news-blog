import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import { validate } from "class-validator";
import { LinqRepository } from "typeorm-linq-repository";
import {Channels} from "../entity/Channels";
import bcrypt from 'bcrypt';


export default class UserController{


    public async createUser(req: Request, res: Response): Promise<Response> {

        let { login, email, password,name,surname,patronymic, tel, img_avatar } = req.body;
        const hashedPassword=await UserController.cryptPassword(password)
        if (typeof hashedPassword!=="string")
            return res.status(400).json("loh")

        const userRepository: LinqRepository<Users> = new LinqRepository(Users);

        const userByEmail = await userRepository.getOne()
            .where(u => u.email)
            .equal(email).count();
        if ( userByEmail > 0 ) {
            return res.status(409).send('user with email already exist')
        }

        const userByLogin = await userRepository.getOne()
            .where(u => u.login)
            .equal(login).count();
        if ( userByLogin > 0 ) {
            return res.status(409).send('user with login already exist')
        }

        const user=new Users()
        user.email=email
        user.login=login
        user.password=hashedPassword
        user.name=name
        user.surname=surname
        user.patronymic=patronymic
        user.tel=tel
        user.imgAvatar=img_avatar
        user.createdAt= new Date()
        user.updatedAt= new Date()
        await getRepository(Users).save(user)

        const channel=new Channels()
        channel.name=""
        channel.descriptions=''
        channel.imgAvatar=''
        channel.user=user
        channel.createdAt= new Date()
        channel.updatedAt= new Date()
        await getRepository(Channels).save(channel)

        return res.status(201).send("User created");
    }


    private static async cryptPassword (password:string):Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return  await bcrypt.hash(password, salt);
    }


}