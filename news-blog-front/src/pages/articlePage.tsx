import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ArticleItem from "../components/article/ArticleItem";
import axios from "axios";
import './articlePage.css'
import {findAllByDisplayValue} from "@testing-library/react";
import { ArticleList } from '../components/article/ArticleList';
import  {Menu}  from '../components/Menu/Menu';
import history from '../constants/history'

// const ArticlePage: React.FC=({})=> {
//
//     const [articles, setArticles]= useState<IArticle[]>([])
//
//
//     const [body,setBody]= useState("")
//
//     useEffect(()=>{
//         fetchArticles()
//     },[])
//
//
//     const handleBody = (e: ((prevState: string) => string) | string) =>{
//         setBody(e)
//     }
//
//
//     async function fetchArticles(){
//         try{
//             const response =await axios.get<IArticle[]>('http://localhost:3001/api/article')
//             console.log(response.data[0].name)
//             setArticles(response.data)
//         }
//         catch (e){
//             alert(e)
//         }
//     }
//
//     return (
//         <div className="articleEditor">
//             <ReactQuill
//                 placeholder="fdsdfsd"
//                 onChange={handleBody}
//                 value={body}
//             />
//             {articles.map(article=>
//                 <ArticleItem key={article.id} article={article}/>
//             )}
//             <div>
//                 {body}
//             </div>
//         </div>
//
//     );
// }
// export default ArticlePage;

export interface IAppProps {
    error: any;
    isLoaded: false;
}

export class ArticlePage extends Component{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            error: '',
        };
    }
    public render() {
        const localState: any = this.state;
        if (localState.error) {
            return <div>Error: {localState.error!.message}</div>;
        }  else {
            return (
                <div>
                    <div className='rubrics'>
                        {localStorage.rubrics}
                    </div>
                    <div className={".NewsItemContainer"}>
                        <Menu history={history}/>
                        <ArticleList />


                    </div>
                </div>
            );
        }
    }
}