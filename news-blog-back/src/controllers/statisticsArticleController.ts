import {Request, Response} from "express";
import {getRepository} from "typeorm";
import * as jwt from "jsonwebtoken";
import {Between,Not,In} from "typeorm";
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
const excel = require('node-excel-export');
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
            if (rate.articleId==articleId){

                if (rate.userId==id)
                    await getRepository(ArticlesUserRate).remove(rate)
            }


        const statistic= new ArticlesUserRate()
        statistic.user=user
        statistic.article=article
        statistic.like=1
        statistic.createdAt= new Date()
        statistic.updatedAt= new Date()
        await getRepository(ArticlesUserRate).save(statistic)


        const newArticle=await getRepository(Articles).findOne(articleId,{relations:['articlesUserRate','statisticsArticles']})

        let likes=0
        let dislikes=0
        for (const rate of newArticle.articlesUserRate) {

            if (rate.like == 1)
                likes += 1
            if (rate.like == 0)
                dislikes += 1

        }

        for (const statistics of newArticle.statisticsArticles){
            statistics.like=likes
            statistics.dislike=dislikes
            await getRepository(StatisticsArticles).save(statistics)
        }
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
        const article=await getRepository(Articles).findOne(articleId,{relations:['articlesUserRate','statisticsArticles']})

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


        const newArticle=await getRepository(Articles).findOne(articleId,{relations:['articlesUserRate','statisticsArticles']})


        let likes=0
        let dislikes=0
        for (const rate of newArticle.articlesUserRate) {
            if (rate.like == 1)
                likes += 1
            if (rate.like == 0)
                dislikes += 1

        }


        for (const statistics of newArticle.statisticsArticles){
            statistics.like=likes
            statistics.dislike=dislikes
            await getRepository(StatisticsArticles).save(statistics)
        }

        return res.status(200).send('Дизлайкнул')
    }

    public async updateStatisticsArticle(article: Articles) {
        for(const statistic of article.statisticsArticles){
            statistic.shows += 1;
            await getRepository(StatisticsArticles).save(statistic)
        }
    }

    public async getStatisticsPublication(req:Request, res:Response):Promise<Response>{
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }
        const user=await getRepository(Users).findOne(id)
        const channel=await getRepository(Channels).findOne({where:{user:user}})
            // console.log(channel)
        const articles=await getRepository(Articles).find({relations:['statisticsArticles','channelArticles']})
        const result=[]
        let ctrMax=0
        let showsSum=0
        let commentSum=0
        let subscriptionsSum=0
        let likesSum=0
        for (const article of articles)
        {
            for (const art of article.channelArticles)
                 if (art.channelId==channel.id ){

                     let ctr
                     let shows
                     let subscriptions
                     let likes
                     for (const statistic of article.statisticsArticles){
                         shows= statistic.shows
                         ctr= statistic.ctr/shows*100
                         subscriptions= statistic.subscriptions
                         likes=statistic.like
                     }
                     showsSum+=shows
                     likesSum+=likes
                     subscriptionsSum+=subscriptions
                     if (ctr>ctrMax)
                         ctrMax=ctr
                     const responseArticle=[
                         article.updatedAt,
                         article.title,
                         ctr,
                         shows,
                         subscriptions,
                         likes,
                     ]
                     result.push(responseArticle)
            }

        }
        result.push([
             ctrMax,
             showsSum,
             commentSum,
             subscriptionsSum,
             likesSum,
        ])
        return res.status(200).json(result)
    }

    public async getStatisticsAuditorium(req:Request, res:Response):Promise<Response>{
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }
        const result=[]
         let nowDate= new Date()
        nowDate= new Date(nowDate.getFullYear(),nowDate.getMonth(),28)
        const user=await getRepository(Users).findOne(id)
        const channel=await getRepository(Channels).findOne({where:{user:user}})
        for (let i=0;i<12;i++){
            if (nowDate.getMonth()-i>0) {
                const nextDate=new Date(nowDate.getFullYear(), nowDate.getMonth() - i+1, 1)
                console.log("nowDate/ "+nextDate.toISOString())
                const lastDate=new Date(nowDate.getFullYear(), nowDate.getMonth() - i, 1)
                console.log("lastDate/ "+lastDate.toISOString())

                const statisticsChannels = await getRepository(StatisticsChannels).find({
                    where: {
                        channelId: channel.id,
                        updatedAt: Between(lastDate, nextDate),
                       // userId:Not(In(existUser))
                    }
                })
                const existUser=[]
                for (const stat of statisticsChannels)
                    existUser.push(stat.userId)
                console.log(existUser)
                const arr=Array.from(new Set(existUser))
                console.log(arr)
                result.push(arr.length)


            }
            else {
                const nextDate=new Date(nowDate.getFullYear()-1,nowDate.getMonth()+(12-i+1),1)
              //  console.log("nowDate/ "+nextDate.toISOString())
                const lastDate=new Date(nowDate.getFullYear()-1,nowDate.getMonth()+(12-i),1)
               // console.log("lastDate/ "+lastDate.toISOString())


                const statisticsChannels =await getRepository(StatisticsChannels).find({where:{
                        channelId:channel.id,
                        updatedAt:Between(lastDate, nextDate),
                     //   userId:Not(In(existUser))

                    }})

                const existUser=[]
                for (const stat of statisticsChannels)
                    existUser.push(stat.userId)
                console.log(existUser)
                const arr=Array.from(new Set(existUser))
                console.log(arr)
                result.push(arr.length)

                // for (const stat of statisticsChannels)
                //     existUser.push(stat.userId)

            }
        }
        // let newDate= nowDate.

        return res.json(result).status(200)
    }

    public async exportStatisticsPublication(req:Request, res:Response):Promise<Response>{
        // You can define styles as json object
        const styles = {
            headerDark: {
                fill: {
                    fgColor: {
                        rgb: 'FF000000'
                    }
                },
                font: {
                    color: {
                        rgb: 'FFFFFFFF'
                    },
                    sz: 14,
                    bold: true,
                }
            },
            cellPink: {
                fill: {
                    fgColor: {
                        rgb: 'FFFFCCFF'
                    }
                }
            },
            cellGreen: {
                fill: {
                    fgColor: {
                        rgb: 'FF00FF00'
                    }
                }
            }
        };

//Array of objects representing heading rows (very top)
        const heading = [
            [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
            ['a2', 'b2', 'c2'] // <-- It can be only values
        ];

//Here you specify the export structure
        const specification = {
            customer_name: { // <- the key should match the actual data key
                displayName: 'Customer', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                cellStyle: function(value, row) { // <- style renderer function
                    // if the status is 1 then color in green else color in red
                    // Notice how we use another cell value to style the current one
                    return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible
                },
                width: 120 // <- width in pixels
            },
            status_id: {
                displayName: 'Status',
                headerStyle: styles.headerDark,
                cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
                    return (value == 1) ? 'Active' : 'Inactive';
                },
                width: '10' // <- width in chars (when the number is passed as string)
            },
            note: {
                displayName: 'Description',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            }
        }

// The data set should have the following shape (Array of Objects)
// The order of the keys is irrelevant, it is also irrelevant if the
// dataset contains more fields as the report is build based on the
// specification provided above. But you should have all the fields
// that are listed in the report specification
        const dataset = [
            {customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown'},
            {customer_name: 'HыавпвпывапP', status_id: 0, note: 'some note'},
            {customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown'}
        ]

// Define an array of merges. 1-1 = A:1
// The merges are independent of the data.
// A merge will overwrite all data _not_ in the top-left cell.
        const merges = [
            { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
            { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
            { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
        ]

// Create the excel report.
// This function will return Buffer
        const report = excel.buildExport(
            [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                {
                    name: 'Report', // <- Specify sheet name (optional)
                    heading: heading, // <- Raw heading array (optional)
                    merges: merges, // <- Merge cell ranges
                    specification: specification, // <- Report specification
                    data: dataset // <-- Report data
                }
            ]
        );

// You can then return this straight
        res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
        return res.json(report);

    }


}



