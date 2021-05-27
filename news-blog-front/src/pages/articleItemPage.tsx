import React, {useEffect, useState} from 'react';
import {IArticle} from '../types/articles';
import ArticleItem from "../components/ArticleItem";
import axios from "axios";


const ArticleItemPage: React.FC=({})=> {

    const [articles, setArticles]= useState<IArticle[]>([])

    useEffect(()=>{
        fetchArticles()
    },[])

    async function fetchArticles(){
        try{
            // const response =await axios.get<IArticle[]>('http://localhost:3001/api/article',{params:{
            //         ids:'1'
            //     }})
            const response =await axios.get<IArticle[]>('http://localhost:3001/api/article')
            console.log(response.data[0].name)
            setArticles(response.data)
        }
        catch (e){
            alert(e)
        }
    }

    return (
        <div>
            {articles.map(article=>
                <ArticleItem key={article.id} article={article}/>
            )}
        </div>
    );
}
export default ArticleItemPage;
