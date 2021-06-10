import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import { LinqRepository } from "typeorm-linq-repository";

class AuthController {
    public async login(req: Request, res: Response): Promise<Response>
    {
        let { login, password } = req.body;
        if (!(login && password)) {
            return res.status(400).send('login or password is empty');
        }

        const userRepository = getRepository(Users);
        let user: Users;
        try {
            user = await userRepository.findOneOrFail({ where: { login } });
        } catch (error) {
            return res.status(401).send('user dont exist');
        }

        const token = jwt.sign(
            { id: user.id, login: user.login },
            process.env.JWT_SECRET,
            { expiresIn: "10h" }
        );
        const response = {
            'id':user.id,
            'login':user.login,
            'email':user.email,
            'token':token,
        }
        return res.status(200).json(response);
    }

    public async isAuth(token):Promise<boolean>{
        return <boolean>jwt.verify(token,  process.env.JWT_SECRET);
    }

    public async me(req: Request, res: Response): Promise<Response>{
        const token = <string>req.headers["authorization"].split(' ')[1];
        console.log(token)
        const jwtPayload = <any>jwt.verify(token,  process.env.JWT_SECRET);
        if (jwtPayload==null)
            return res.status(401).send('jwt где?');
        const { id } = jwtPayload;
        const userRepository: LinqRepository<Users> = new LinqRepository(Users);
        const user = await userRepository.getOne()
            .where(u => u.id)
            .equal(id)
        if (user==null)
            return res.status(401).send('user dont exist');
        return res.status(200).json(user);
        //     {
        //     id:user.id,
        //     email:user.email,
        //     login:user.login,
        //     name:user.name,
        //     imgAvatar:user.imgAvatar,
        //     surname:user.surname,
        //     patronymic:user.patronymic,
        //     tel:user.tel
        // });
    }
}
export default AuthController;