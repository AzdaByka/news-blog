import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Articles} from "../entity/Articles";
import { LinqRepository } from "typeorm-linq-repository";

export default class ArticlesController{

    public async getArticle(req: Request, res: Response): Promise<Response>{
        let {id}= req.body
        const article = await getRepository(Articles).find(id);
        return res.json(article);
    }

    public async getArticles(req: Request, res: Response): Promise<Response>{
        const article = await getRepository(Articles).find();
        return res.json(article);
    }
}
