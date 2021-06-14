import {Request, Response} from "express";
import {getRepository} from "typeorm";
import * as jwt from "jsonwebtoken";
import {Articles} from "../entity/Articles";
import AuthController from "./auth-controller";
import { LinqRepository } from "typeorm-linq-repository";
import {isNumber} from "class-validator";
import {StatisticsArticles} from "../entity/StatisticsArticles";
import {Categories} from "../entity/Categories";
import {ChannelArticles} from "../entity/ChannelArticles";
import {Channels} from "../entity/Channels";
import {Users} from "../entity/Users";
import {Delete} from "routing-controllers";
import StatisticsArticleController from "./statisticsArticleController";
import {ArticlesUserRate} from "../entity/ArticleUserRate";
const auth = new AuthController()
const statisticsArticles = new StatisticsArticleController()

export default class ArticlesController{

    public async getArticle(req: Request, res: Response): Promise<Response>{
        let {ids}= req.body

        const authHeader = <string>req.headers["authorization"].split(' ')[1];
       // if (authHeader!='' && authHeader!=null)
      //  {
            const articles = await getRepository(Articles).find({relations:['statisticsArticles']});
            for (const article of articles){
                await statisticsArticles.updateStatisticsArticle(article)
            }
            //console.log(article)
            return res.json(articles);
      //  }
      //      if (await auth.isAuth(authHeader)){

     //       }
    //    return res.status(403).json("Нет такого пользователя")
    }

    public async addArticle(req:Request, res:Response):Promise<Response>{


        const {id,title, text, shortDescription, preview, rubrics}=req.body

        const article= new Articles()
        article.title=title
        article.text=text
        article.shortDescription=shortDescription
        article.imgs=preview
        article.createdAt= new Date()
        article.updatedAt= new Date()
        await getRepository(Articles).save(article)


        const statistic= new StatisticsArticles()
        statistic.ctr=0
        statistic.shows=0
        statistic.like=0
        statistic.dislike=0
        statistic.subscriptions=0
        statistic.article=article
        statistic.createdAt= new Date()
        statistic.updatedAt= new Date()
        await getRepository(StatisticsArticles).save(statistic)


        if (Array.isArray(rubrics))
            for (const rub of rubrics) {
                const category= new Categories()
                category.name=String(rub)
                category.article=article
                category.createdAt= new Date()
                category.updatedAt= new Date()
                await getRepository(Categories).save(category)
            }

        const channels= await getRepository(Channels).find({relations:["user"]})
        let channel:Channels=null
        for (const channelItem of channels)
            if (channelItem.user.id == id)
            {
                channel  =  channelItem
                break
            }

        const channelArticles= new ChannelArticles()
        channelArticles.channel= channel
        channelArticles.article=article
        channelArticles.createdAt= new Date()
        channelArticles.updatedAt= new Date()
        await getRepository(ChannelArticles).save(channelArticles)


         return res.status(201).json("Статья добавлена")
    }


    public async putArticle(req:Request, res:Response):Promise<Response>{

        const {id,title, text, shortDescription, preview, rubrics}=req.body
        const article= await getRepository(Articles).findOne(id)
        // const article= new Articles()
        article.title=title
        article.text=text
        article.shortDescription=shortDescription
        article.imgs=preview
        article.updatedAt= new Date()
        await getRepository(Articles).save(article)

        const articlesCategories= await getRepository(Articles).find({relations:["categories"]})

        for (const articleItem of articlesCategories) {
            if (articleItem.id==id)
                await getRepository(Categories).remove(articleItem.categories)
        }



        if (Array.isArray(rubrics))
            for (const rub of rubrics) {
                const category= new Categories()
                category.name=String(rub)
                category.article=article
                category.createdAt= new Date()
                category.updatedAt= new Date()
                await getRepository(Categories).save(category)
            }



        return res.status(200).json("Статья обнавлена")
    }

    public async deleteArticle(req:Request, res:Response):Promise<Response>{
        let {id}=req.body
        if (id==null)
            id = Number(req.query.id);
        const articles= await getRepository(Articles).find({relations:["categories","statisticsArticles"]})
        for (const article of  articles)
        {
            if (article.id==id)
            {
                for(const category of article.categories){
                    await getRepository(Categories).delete(category.id)
                }
                for(const statistic of article.statisticsArticles){
                    await getRepository(StatisticsArticles).delete(statistic.id)
                }
            }

        }
        await getRepository(Articles).delete(id)
        return res.status(200).send("Статья удалена")
    }

    public async getEditor(req:Request, res:Response):Promise<Response>{
        let {id}=req.body
        if (id==null)
            id = Number(req.query.id);

        const channels= await getRepository(Channels).find({relations:["user"]})
        console.log(channels)
        let channel:Channels=null
        for (const channelItem of channels)
            if (channelItem.user!==null)
                if (channelItem.user.id == id)
                {
                    channel  =  channelItem
                    break
                }
        const channelArticles = await getRepository(ChannelArticles).find({relations:["article"]});
        console.log(channel)
        const result:any[]=[]
        for (const channelArticle of channelArticles) {
            if (channelArticle.channelId==channel.id){
                result.push(channelArticle.article)
            }
        }
       if (result.length==0)
              return res.status(404).send('У вас нет статей')
        return res.status(200).json(result)
    }

    public async getArticleById(req:Request, res:Response):Promise<Response>{
         let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }

        let flag= req.query.flag
        if (!flag){
            flag=req.body.flag
        }



        console.log(flag)
        // let {id}= req.body
        const article= await getRepository(Articles).findOne(id,{relations:['categories','statisticsArticles']})
        if (flag==null) {
            let userId= Number(req.query?.userId)
            if (!userId){
                userId=req.body?.userId
            }
            console.log(userId)
            await statisticsArticles.updateStatisticsCTR(article,userId)
        }
        // const articleLinqRepository: LinqRepository<Articles> = new LinqRepository(Articles);
        // const article = await articleLinqRepository
        //     .getOne()
        //     .where(m => m.id)
        //     .equal(id)
        return res.json(article);


    }

    public async getArticlesLiked(req: Request, res: Response): Promise<Response>{
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }
        const result=[]
        const articlesUserRates=await getRepository(ArticlesUserRate).find({relations:['article']})

        for (const articlesUserRate of articlesUserRates){
            if (articlesUserRate.userId==id && articlesUserRate.like==1){
                result.push(articlesUserRate.article)
            }
        }
        return res.json(result).status(200);
    }


}


