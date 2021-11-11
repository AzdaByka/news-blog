import { Request, Response } from "express";
import {Between, getRepository} from "typeorm";
import { Users } from "../entity/Users";
import { validate } from "class-validator";
import { LinqRepository } from "typeorm-linq-repository";
import {Channels} from "../entity/Channels";
import bcrypt from 'bcrypt';
import {Articles} from "../entity/Articles";
import {Subscriptions} from "../entity/Subscriptions";
import {StatisticsChannels} from "../entity/StatisticsChannels";


export default class ChannelController{


    public async updateChannelInformation(req: Request, res: Response): Promise<Response> {
        let { id,  name, description, img_avatar } = req.body;

        const channel= await getRepository(Channels).findOne(Number(id))

        channel.name=name
        channel.descriptions=description
        channel.imgAvatar=img_avatar
        channel.updatedAt=new Date()
        await getRepository(Channels).save(channel)
        return res.status(200).json("Канал обновлен")
    }

    public async getInformation(req: Request, res: Response): Promise<Response> {
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }


        const channelRepository: LinqRepository<Channels> = new LinqRepository(Channels);
        const channel = await channelRepository.getOne()
            .where(u => u.user.id)
            .equal(id);

        const subscriptionsRepository: LinqRepository<Subscriptions> = new LinqRepository(Subscriptions);
        const subscriptions = await subscriptionsRepository.getAll()
            .where(u => u.channel.id)
            .equal(channel.id).count();
       // console.log(subscriptions)
        let check='нет'
        const subscription = await getRepository(Subscriptions).find()
        for (const sub of subscription)
            if (sub.userId==id && sub.channelId==channel.id)
                check='подписан'

        const aud= await ChannelController.getAuditorium(id)

        const result=[
            channel.name,
            channel.descriptions,
            channel.imgAvatar,
            subscriptions,
            channel.id,
            check,
            aud
        ]
        return  res.status(200).json(result)
    }

    public async subscribeOnChannel(req: Request, res: Response): Promise<Response>{
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }
        let channelId= Number(req.query.channelId)
        if (!channelId){
            channelId=req.body.channelId
        }
        const channel= await getRepository(Channels).findOne(channelId)
        const user= await getRepository(Users).findOne(id)

        const subscriptions=new Subscriptions()
        subscriptions.channel=channel
        subscriptions.user=user
        subscriptions.createdAt=new Date()
        subscriptions.updatedAt= new Date()
        await getRepository(Subscriptions).save(subscriptions)

        return res.status(200).json("Подписался")
    }

    public async unSubscribeOnChannel(req: Request, res: Response): Promise<Response>{
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }
        let channelId= Number(req.query.channelId)
        if (!channelId){
            channelId=req.body.channelId
        }

        const subscriptions = await getRepository(Subscriptions).find()
        for (const sub of subscriptions)
            if (sub.user.id==id && sub.channel.id==channelId)
            {
                await getRepository(Subscriptions).remove(sub)
                return res.status(200).json('отписан')
            }
        return res.status(200).json('нет от чего отписываться')
    }

    public async checkSubscription(req: Request, res: Response): Promise<Response>{
        let id= Number(req.query.id)
        if (!id){
            id=req.body.id
        }
        let channelId= Number(req.query.channelId)
        if (!channelId){
            channelId=req.body.channelId
        }

        const subscriptions = await getRepository(Subscriptions).find()
        for (const sub of subscriptions)
            if (sub.user.id==id && sub.channel.id==channelId)
                return res.status(200).json('подписан')
        return res.status(200).json('неподписан')

    }


    private static async getAuditorium(id:number):Promise<number>{

        const result=[]
        let nowDate= new Date()
        nowDate= new Date(nowDate.getFullYear(),nowDate.getMonth(),28)
        const user=await getRepository(Users).findOne(id)
        const channel=await getRepository(Channels).findOne({where:{user:user}})

        for (let i=0;i<12;i++){
            if (nowDate.getMonth()-i>0) {
                const nextDate=new Date(nowDate.getFullYear(), nowDate.getMonth() - i+1, 1)
                //  console.log("nowDate/ "+nextDate.toISOString())
                const lastDate=new Date(nowDate.getFullYear(), nowDate.getMonth() - i, 1)
                //    console.log("lastDate/ "+lastDate.toISOString())

                const statisticsChannels = await getRepository(StatisticsChannels).find({
                    where: {
                        channel: channel,
                        updatedAt: Between(lastDate, nextDate),
                        // userId:Not(In(existUser))
                    }
                })
                const existUser=[]
                for (const stat of statisticsChannels)
                {
                   // console.log(stat)
                    existUser.push(stat.userId)
                }
                // console.log(existUser)
                const arr=Array.from(new Set(existUser))
                // console.log(arr)
                result.push(arr.length)


            }
            else {
                const nextDate=new Date(nowDate.getFullYear()-1,nowDate.getMonth()+(12-i+1),1)
                //  console.log("nowDate/ "+nextDate.toISOString())
                const lastDate=new Date(nowDate.getFullYear()-1,nowDate.getMonth()+(12-i),1)
                // console.log("lastDate/ "+lastDate.toISOString())


                const statisticsChannels =await getRepository(StatisticsChannels).find({where:{
                        channel:channel,
                        updatedAt:Between(lastDate, nextDate),
                        //   userId:Not(In(existUser))

                    }})

                const existUser=[]
                for (const stat of statisticsChannels)
                {
                   // console.log(stat)
                    existUser.push(stat.userId)

                }
                //   console.log(existUser)
                const arr=Array.from(new Set(existUser))
                //     console.log(arr)
                result.push(arr.length)

                // for (const stat of statisticsChannels)
                //     existUser.push(stat.userId)

            }
        }
        let count=0
        for (const i of result){
            count+=i
        }


        return count
    }


}