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
            { expiresIn: "24h" }
        );
        const response = {
            'id':user.id,
            'login':user.login,
            'email':user.email,
            'access-token':token,
        }
        return res.status(200).json(response);
    }

    public async isAuth(authHeader):Promise<boolean>{
        const token = authHeader.split(' ')[1];
        return <boolean>jwt.verify(token,  process.env.JWT_SECRET);
    }

    public async me(req: Request, res: Response): Promise<Response>{
        const authHeader = <string>req.headers["authorization"];
        const token = authHeader.split(' ')[1];
        const jwtPayload = <any>jwt.verify(token,  process.env.JWT_SECRET);
        const { id } = jwtPayload;
        const userRepository: LinqRepository<Users> = new LinqRepository(Users);
        const userById = await userRepository.getOne()
            .where(u => u.id)
            .equal(id)
        return res.status(200).json(userById);
    }
}
export default AuthController;