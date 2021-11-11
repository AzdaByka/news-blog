import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import { validate } from "class-validator";
import { LinqRepository } from "typeorm-linq-repository";
import {Channels} from "../entity/Channels";
import bcrypt from 'bcrypt';
import {Articles} from "../entity/Articles";


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
        channel.name='безымянный'
        channel.descriptions='без описания'
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

    public async updateInformation(req: Request, res: Response): Promise<Response>{
        let { id, login, name, surname, patronymic, tel, img_avatar } = req.body;
        const user= await getRepository(Users).findOne(id)
       // console.log(user)
        user.name=name
        user.surname=surname
        user.login=login
        user.patronymic=patronymic
        user.tel=tel
        user.imgAvatar=img_avatar
        user.updatedAt=new Date()
        await getRepository(Users).save(user)
        return res.status(200).json("Пользователь обновлен")
    }

    public async getInformation(req: Request, res: Response): Promise<Response>{
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }
        const user= await getRepository(Users).findOne(id)
        const result=[
        user.name,
        user.surname,
        user.login,
        user.patronymic,
        user.tel,
        user.imgAvatar,
            ]
        return  res.status(200).json(result)
    }

}