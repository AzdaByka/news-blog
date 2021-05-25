import React, {useEffect, useState} from 'react';
import {IArticle} from '../types/articles';
import 'react-quill/dist/quill.snow.css'
import ArticleItem from "../components/ArticleItem";
import axios from "axios";

const MainPage: React.FC=({})=> {

    const [articles, setArticles]= useState<IArticle[]>([])

    useEffect(()=>{
        fetchArticles()
    },[])

    async function fetchArticles(){
        try{
            const response =await axios.get<IArticle[]>('http://localhost:3001/api/article')
            console.log(response.data[0].name)
            setArticles(response.data)
        }
        catch (e){
            alert(e)
        }
    }
    return (
        <div className="articleEditor">

            {articles.map(article=>
                <ArticleItem key={article.id} article={article}/>
            )}

        </div>

    );
}
export default MainPage;
