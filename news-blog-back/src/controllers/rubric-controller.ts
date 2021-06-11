import {Request, response, Response} from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import { LinqRepository } from "typeorm-linq-repository";
import {Articles} from "../entity/Articles";

export default class RubricController {
    public async top(req: Request, res: Response): Promise<Response>{
        const result=await RubricController.getArticles("top")
        if (result.length==0)
            return res.status(404).json("Нет статей в рубрике")
        return res.status(200).json(result)
    }

    public async movie(req: Request, res: Response): Promise<Response>{
        const result=await RubricController.getArticles("Кино")
        if (result.length==0)
            return res.status(404).json("Нет статей в рубрике")
        return res.status(200).json(result)
    }

    public async travel(req: Request, res: Response): Promise<Response>{
        const result=await RubricController.getArticles("Путешествия")
        if (result.length==0)
            return res.status(404).json("Нет статей в рубрике")
        return res.status(200).json(result)
    }

    public async science(req: Request, res: Response): Promise<Response>{
        const result=await RubricController.getArticles("Наука")
        if (result.length==0)
            return res.status(404).json("Нет статей в рубрике")
        return res.status(200).json(result)
    }

    public async corona(req: Request, res: Response): Promise<Response>{
        const result=await RubricController.getArticles("Коронавирус")
        if (result.length==0)
            return res.status(404).json("Нет статей в рубрике")
        return res.status(200).json(result)
    }

    public async car(req: Request, res: Response): Promise<Response>{
        const result=await RubricController.getArticles("Авто")
        if (result.length==0)
            return res.status(404).json("Нет статей в рубрике")
        return res.status(200).json(result)
    }


    private static async getArticles(name:string):Promise<any[]>
    {
        const articles = await getRepository(Articles).find({relations:["categories"]})
        const result:any[]=[]
        for (const article of articles) {
            for (const rub of article.categories) {
                if (rub.name==name){
                    result.push(article)
                }
            }
        }
        return result
    }
}

