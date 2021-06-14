import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";

import history from '../../constants/history';
import './articleItemPage.css';
import {BASE} from "../../constants/routes";
import Auth from "../../connection/auth";
import {Navbar} from "../../components/Navbars/NavbarMain/Navbar";
import likeImg from '../../stylesheets/imgs/like.svg'
import dislikeImg from '../../stylesheets/imgs/dislike.png'
import logo from "../../stylesheets/imgs/logo.jpg";

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

    const [like,setLike]= useState(1)
    const [dislike,setDislike]= useState(1)
    //47D247 зеленый
    //FF0000 красный
    useEffect(()=>{
        fetchArticles()
    },[])

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


if (article)
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
                    <div className={"row"}>
                        <h3 className={"rowRed"}>{article.title}</h3>
                    </div>
                    <div className={"row"} >
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
