import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";

import history from '../../constants/history';
import './articleItemPage.css';
import {BASE, SIGN_IN, SIGN_UP} from "../../constants/routes";
import Auth from "../../connection/auth";
import {Navbar} from "../../components/Navbars/NavbarMain/Navbar";
import likeImg from '../../stylesheets/imgs/like.svg'
import unsubscribeImg from '../../stylesheets/imgs/unsubscribe.png'
import dislikeImg from '../../stylesheets/imgs/dislike.png'
import subscribeImg from "../../stylesheets/imgs/subscribe.png";
import {IChannel} from "../../types/Channel";
import ChannelDescription from '../../components/Channel/ChannelDescription';

// export interface IAppProps {
//     error?: any;
//     isLoaded?: false;
//     articles?: [];
// }
// export default class ArticleItemPage extends Component<IAppProps> {
//
//     constructor(props: IAppProps) {
//         super(props);
//
//
//         this.state = {
//             error: '',
//             isLoaded: false,
//             articles: [],
//         };
//     }
//
//     async componentDidMount() {
//         try {
//
//             const response =await axios.get<IArticle[]>('http://localhost:3001/api/articleById',{params:{
//                     id:'1'
//                 }})
//
//             console.log(response.data)
//             this.setState({
//                 isLoaded: true,
//                 articles: response.data[0]
//             })
//         } catch (e) {
//             alert(e)
//             console.log(e)
//             this.setState({
//                 isLoaded: true,
//                 e
//             });
//         }
//     }
//     public render() {
//         const localState: any = this.state;
//         if (localState.error) {
//             return <div>Error: {localState.error!.message}</div>;
//         } else if (!localState.isLoaded) {
//             return <div className="spinner-border" role="status">
//                 <span className="visually-hidden">Загрузка...</span>
//             </div>;
//         } else if(!localState.articles)
//             {
//         return (
//             <div>
//
//                     <ArticleItem key={localState.articles.id} article={localState?.article}/>
//
//            </div>)
//             }
//             else{ return (<div></div>)}
//
//
//
//
//
//     }
//
// }




const ArticleItemPage: React.FC=({})=> {

    const [article, setArticles]= useState<IArticle>()
    const [channel,setChannel]=useState([])

    const [subscribedText,setSubscribedText]=useState('подписаться')
    const [subscribedImg,setSubscribedImg]=useState(subscribeImg)

    const [like,setLike]= useState(1)
    const [dislike,setDislike]= useState(1)
    //47D247 зеленый
    //FF0000 красный
    useEffect(()=>{
        fetchArticles()
        fetchChannel()
    },[])



    async function fetchChannel(){
        try{

            const response =await axios.get('http://localhost:3001/api/channel/information',{params:{
                                "id":Auth.getUserId(),
                            }})
           // console.log(response.data)
            setChannel(response.data)
            if (response.data[5]==='подписан'){
                setSubscribedText('отписаться')
                setSubscribedImg(unsubscribeImg)
            }
            else {
                setSubscribedText('подписаться')
                setSubscribedImg(subscribeImg)
            }
        }
        catch (e){
            alert(e)
        }
    }

    async function fetchArticles(){
        try{

            const response =await axios.get<IArticle>('http://localhost:3001/api/articleById',{params:{
                    "id":localStorage.getItem('id'),
                    "userId":Auth.getUserId()
                }})
            console.log(response.data.title)
            setArticles(response.data)
        }
        catch (e){
            alert(e)
        }
    }

    async function sendSetLike(){
        if (!Auth.isAuth())
            history.push(SIGN_IN)
        setLike(1)
        setDislike(0.5)
        if (article!=null)
            await axios.post<IArticle[]>(
                BASE + '/article/like',
                {
                    id: Auth.getUserId(),
                    articleId:article.id,
                    headers: {
                        authorization: "Bearer " + Auth.getUserJWT(),
                    },
                }
            )
    }

    async function sendSetDislike(){
        if (!Auth.isAuth())
            history.push(SIGN_IN)
        setLike(0.5)
        setDislike(1)
        if (article!=null)
            await axios.post<IArticle[]>(
                BASE + '/article/dislike',
                {
                    id: Auth.getUserId(),
                    articleId:article.id,
                    headers: {
                        authorization: "Bearer " + Auth.getUserJWT(),
                    },
                }
        )
    }

    async function subscribe(){
        if (!Auth.isAuth())
            history.push(SIGN_IN)

        if (subscribedText==='отписаться')
        {
            if (channel != null)
                await axios.post(
                    BASE + '/channel/unsubscribe',
                    {
                        id: Auth.getUserId(),
                        channelId:channel[4],
                        headers: {
                            authorization: "Bearer " + Auth.getUserJWT(),
                        },
                    }
                )
        }
        else{
            if (channel!=null)
                await axios.post(
                    BASE + '/channel/subscribe',
                    {
                        id: Auth.getUserId(),
                        channelId:channel[4],
                        headers: {
                            authorization: "Bearer " + Auth.getUserJWT(),
                        },
                    }
                )
        }
        history.replace('/article/'+localStorage.getItem('id'))
        window.location.reload()
    }


if (article&&channel)
    return (
        <>
            <Navbar history={history}/>
        <div className={'container'}>
            <div className={"row"}>
                <div className={"col-md-1"}>
                    <img className={'likes-img d-block m-3'} onClick={sendSetLike} style={{opacity:like}} src={likeImg}  />
                    <img className={'likes-img d-block m-3'} onClick={sendSetDislike} style={{opacity:dislike}} src={dislikeImg} />
                </div>
                <div className={"col-md-11"}>
                    <div className="row">
                        <ChannelDescription channel={channel}/>
                        <div className="col-md-6">
                        <div className={'mt-3'} onClick={subscribe} >
                            <img height={'24px'} width={'24px'} src={subscribedImg} alt=""/>
                             <span className={'ml-1'}> {subscribedText}</span>
                        </div>
                        </div>
                    </div>
                    <div className={"row mt-5"}>
                        <h3 className={"rowRed"}>{article.title}</h3>
                    </div>
                    <div className={"row "} >
                            <div className={"articleImgs"} dangerouslySetInnerHTML={{ __html: article.text }}></div>
                    </div>
                </div>
            </div>


        </div>
        </>
    );
else return <div></div>
}
export default ArticleItemPage;
