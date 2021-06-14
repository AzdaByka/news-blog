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
import {ArticlesUserRate} from "../entity/ArticleUserRate";
import {StatisticsChannels} from "../entity/StatisticsChannels";
const auth = new AuthController()

export default class StatisticsArticleController{


    public async updateStatisticsCTR(article: Articles,userId) {
        for(const statistic of article.statisticsArticles){
            statistic.ctr += 1;
            await getRepository(StatisticsArticles).save(statistic)
        }

        let channel
        const channelArticles=await getRepository(ChannelArticles).find({relations:["channel"]})
        for (const channelArticle of channelArticles){
            console.log(channelArticle.articleId)

            if (channelArticle.articleId==article.id)
            {
                channel=channelArticle.channel
                break
            }
        }
        const user=await getRepository(Users).findOne(userId)
      //  console.log(user)

        const statisticsChannel=new StatisticsChannels()
        statisticsChannel.channel=channel
        statisticsChannel.user=user
        statisticsChannel.createdAt=new Date()
        statisticsChannel.updatedAt= new Date()
        await getRepository(StatisticsChannels).save(statisticsChannel)

    }

    public async updateStatisticsLike(req:Request, res:Response):Promise<Response> {
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }
        let articleId= Number(req.query.articleId)
        if (!articleId){
            articleId=req.body.articleId
        }

        const user=await getRepository(Users).findOne(id,{relations:['articlesUserRate']})
        const article=await getRepository(Articles).findOne(articleId,{relations:['articlesUserRate']})

        for (const rate of user.articlesUserRate)
            if (rate.articleId==articleId&& rate.userId==id){
                await getRepository(ArticlesUserRate).remove(rate)
            }


        const statistic= new ArticlesUserRate()
        statistic.user=user
        statistic.article=article
        statistic.like=1
        statistic.createdAt= new Date()
        statistic.updatedAt= new Date()
        await getRepository(ArticlesUserRate).save(statistic)
        return res.status(200).send('Лайкнул')
    }

    public async updateStatisticsDislike(req:Request, res:Response):Promise<Response>{
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }
        let articleId= Number(req.query.articleId)
        if (!articleId){
            articleId=req.body.articleId
        }

        const user=await getRepository(Users).findOne(id,{relations:['articlesUserRate']})
        const article=await getRepository(Articles).findOne(articleId,{relations:['articlesUserRate']})

        for (const rate of user.articlesUserRate)
            if (rate.articleId==articleId&& rate.userId==id){
                await getRepository(ArticlesUserRate).remove(rate)
            }


        const statistic= new ArticlesUserRate()
        statistic.user=user
        statistic.article=article
        statistic.like=0
        statistic.createdAt= new Date()
        statistic.updatedAt= new Date()
        await getRepository(ArticlesUserRate).save(statistic)

        return res.status(200).send('Дизлайкнул')
    }

    public async updateStatisticsArticle(article: Articles) {
        for(const statistic of article.statisticsArticles){
            statistic.shows += 1;
            await getRepository(StatisticsArticles).save(statistic)
        }
    }

}


