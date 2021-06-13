import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";

import history from '../../constants/history';
import './articleItemPage.css';
import {BASE} from "../../constants/routes";
import Auth from "../../connection/auth";
import {Navbar} from "../../components/Navbars/NavbarMain/Navbar";

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

    const [articles, setArticles]= useState<IArticle>()

    useEffect(()=>{
        fetchArticles()
    },[])

    async function fetchArticles(){
        try{

            const response =await axios.get<IArticle>('http://localhost:3001/api/articleById',{params:{
                    "id":localStorage.getItem('id')
                }})
            console.log(response.data.title)
            setArticles(response.data)
        }
        catch (e){
            alert(e)
        }
    }

if (articles)
    return (
        <>
            <Navbar history={history}/>
        <div className={'container'}>
            <div className={"row"}>
                <div className={"col-md-3"}>

                </div>
                <div className={"col-md-9"}>
                    <div className={"row"}>
                        <h3 className={"rowRed"}>{articles.title}</h3>
                    </div>
                    <div className={"row"} >
                            <div className={"articleImgs"} dangerouslySetInnerHTML={{ __html: articles.text }}></div>
                    </div>
                </div>
            </div>


        </div>
        </>
    );
else return <div></div>
}
export default ArticleItemPage;
